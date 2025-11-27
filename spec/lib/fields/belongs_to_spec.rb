require "rails_helper"
require "administrate/field/belongs_to"
require "support/constant_helpers"
require "support/field_matchers"

describe Administrate::Field::BelongsTo do
  include FieldMatchers

  it do
    should_permit_param(
      "country_code",
      on_model: Customer,
      for_attribute: :territory
    )
  end

  describe "#html_controller" do
    it "returns select" do
      page = :show
      owner = double
      field = Administrate::Field::BelongsTo.new(:owner, owner, page)

      html_controller = field.html_controller

      expect(html_controller).to eq("select")
    end
  end

  describe "#partial_prefixes" do
    it "returns a partial based on the page being rendered" do
      page = :show
      owner = double
      field = Administrate::Field::BelongsTo.new(:owner, owner, page)

      prefixes = field.partial_prefixes

      expect(prefixes).to eq(["fields/belongs_to", "fields/associative", "fields/base"])
    end
  end

  describe "#associated_class" do
    it "is automatically resolved for a conventional association" do
      line_item = create(:line_item)
      field = Administrate::Field::BelongsTo.new(
        :product,
        nil,
        :show,
        resource: line_item
      )
      expect(field.associated_class).to eq(Product)
    end

    it "is automatically resolved for a custom association" do
      customer = create(:customer)
      field = Administrate::Field::BelongsTo.new(
        :territory,
        nil,
        :show,
        resource: customer
      )
      expect(field.associated_class).to eq(Country)
    end
  end

  describe "#display_associated_resource" do
    it "renders the associated resource for a conventional association" do
      product = create(:product, name: "Associated Product")
      line_item = create(:line_item, product: product)
      field = Administrate::Field::BelongsTo.new(
        :product,
        line_item.product,
        :show,
        resource: line_item
      )
      allow_any_instance_of(ProductDashboard).to(
        receive(:display_resource) do |_, resource|
          "Mock #{resource.name}"
        end
      )
      expect(field.display_associated_resource).to eq("Mock Associated Product")
    end

    it "renders the associated resource for a custom association" do
      country = create(:country, name: "Associated Country")
      customer = create(:customer)
      field = Administrate::Field::BelongsTo.new(
        :territory,
        country,
        :show,
        resource: customer
      )
      allow_any_instance_of(CountryDashboard).to(
        receive(:display_resource) do |_, resource|
          "Mock #{resource.name}"
        end
      )
      expect(field.display_associated_resource).to eq("Mock Associated Country")
    end
  end

  describe "class_name option" do
    it "determines the associated_class" do
      line_item = create(:line_item)
      field_class = Administrate::Field::BelongsTo.with_options(
        class_name: "Customer"
      )
      field = field_class.new(
        :product,
        line_item.product,
        :show,
        resource: line_item
      )
      expect(field.associated_class).to eq(Customer)
    end

    it "uses it to determine how to render the associated resource" do
      product = create(:product, name: "Associated Product")
      line_item = create(:line_item, product: product)
      field_class = Administrate::Field::BelongsTo.with_options(
        class_name: "LineItem"
      )
      field = field_class.new(
        :product,
        line_item.product,
        :show,
        resource: line_item
      )
      expect(field.display_associated_resource).to match(
        /^Line Item \#\d\d\d\d$/
      )
    end
  end

  describe ":include_blank option" do
    context "default value as true" do
      it "determines if choices has blank option or not" do
        customer = create(:customer, territory: nil)
        association = Administrate::Field::BelongsTo
        field = association.new(
          :territory,
          [],
          :edit,
          resource: customer
        )
        candidates = field.associated_resource_options

        expect(field.include_blank_option).to eq(true)
        expect(candidates).to eq([])
      end
    end

    context "set value as false" do
      it "determines if choices has blank option or not" do
        customer = create(:customer, territory: nil)
        association = Administrate::Field::BelongsTo.with_options(
          include_blank: false
        )
        field = association.new(
          :territory,
          [],
          :edit,
          resource: customer
        )
        candidates = field.associated_resource_options

        expect(field.include_blank_option).to eq(false)
        expect(candidates).to eq([])
      end
    end

    context "when given an include_blank option is true" do
      it "returns include_blank and placeholder options with '---'" do
        customer = create(:customer, territory: nil)
        association = Administrate::Field::BelongsTo.with_options(
          include_blank: true
        )
        field = association.new(
          :territory,
          [],
          :edit,
          resource: customer
        )

        tag_options = field.tag_options
        html_options = field.html_options

        expect(tag_options[:include_blank]).to eq("---")
        expect(html_options[:placeholder]).to eq("---")
        expect(html_options.dig(:data, :"selectize-required")).to be_nil
      end
    end

    context "when given an include_blank option is a string" do
      it "returns include_blank and placeholder options with the given string" do
        customer = create(:customer, territory: nil)
        association = Administrate::Field::BelongsTo.with_options(
          include_blank: "Select an option"
        )
        field = association.new(
          :territory,
          [],
          :edit,
          resource: customer
        )

        tag_options = field.tag_options
        html_options = field.html_options

        expect(tag_options[:include_blank]).to eq("Select an option")
        expect(html_options[:placeholder]).to eq("Select an option")
        expect(html_options.dig(:data, :"selectize-required")).to be_nil
      end
    end

    context "when given an include_blank option is false" do
      it "returns include_blank and placeholder options with nil" do
        customer = create(:customer, territory: nil)
        association = Administrate::Field::BelongsTo.with_options(
          include_blank: false
        )
        field = association.new(
          :territory,
          [],
          :edit,
          resource: customer
        )

        tag_options = field.tag_options
        html_options = field.html_options

        expect(tag_options[:include_blank]).to eq(nil)
        expect(html_options[:placeholder]).to eq(nil)
        expect(html_options.dig(:data, :"selectize-required")).to eq(true)
      end
    end
  end

  describe "#associated_resource_options" do
    context "with `order` option" do
      it "returns the resources in correct order" do
        order = create(:order)
        create_list(:customer, 5)
        options = {order: "name"}
        association = Administrate::Field::BelongsTo.with_options(options)

        field = association.new(:customer, [], :show, resource: order)

        correct_order = Customer.order("name").pluck(:id)

        resources = field.associated_resource_options.compact.to_h.values
        expect(resources).to eq correct_order
      end

      it "ignores the order passed in `scope`" do
        order = create(:order)
        create_list(:customer, 3)
        options = {
          order: "name",
          scope: -> { Customer.order(name: :desc) }
        }
        association = Administrate::Field::BelongsTo.with_options(options)

        field = association.new(:customer, [], :show, resource: order)

        correct_order = Customer.order("name").pluck(:id)

        resources = field.associated_resource_options.compact.to_h.values
        expect(resources).to eq correct_order
      end
    end

    context "with `scope` option" do
      it "returns the resources within the passed scope" do
        # Building instead of creating, to avoid a dependent customer being
        # created, leading to random failures
        order = build(:order)

        1.upto(3) { |i| create :customer, name: "customer-#{i}" }
        scope = -> { Customer.order(name: :desc).limit(2) }

        association = Administrate::Field::BelongsTo.with_options(scope: scope)
        field = association.new(:customer, [], :show, resource: order)
        resources = field.associated_resource_options.compact.to_h.keys

        expect(resources).to eq ["customer-3", "customer-2"]
      end

      context "when scope with argument" do
        it "returns the resources within the passed scope" do
          # Building instead of creating, to avoid a dependent customer being
          # created, leading to random failures
          order = build(:order)

          1.upto(3) { |i| create :customer, name: "customer-#{i}" }
          scope = ->(_field) { Customer.order(name: :desc).limit(2) }

          association = Administrate::Field::BelongsTo.with_options(scope: scope)
          field = association.new(:customer, [], :show, resource: order)
          resources = field.associated_resource_options.compact.to_h.keys

          expect(resources).to eq ["customer-3", "customer-2"]
        end
      end
    end
  end
end
