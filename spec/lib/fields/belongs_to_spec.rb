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
      for_attribute: :territory,
    )
  end

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      owner = double
      field = Administrate::Field::BelongsTo.new(:owner, owner, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/belongs_to/#{page}")
    end
  end

  describe "#associated_class" do
    it "is automatically resolved for a conventional association" do
      line_item = create(:line_item)
      field = Administrate::Field::BelongsTo.new(
        :product,
        nil,
        :show,
        resource: line_item,
      )
      expect(field.associated_class).to eq(Product)
    end

    it "is automatically resolved for a custom association" do
      customer = create(:customer)
      field = Administrate::Field::BelongsTo.new(
        :territory,
        nil,
        :show,
        resource: customer,
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
        resource: line_item,
      )
      allow_any_instance_of(ProductDashboard).to(
        receive(:display_resource) do |_, resource|
          "Mock #{resource.name}"
        end,
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
        resource: customer,
      )
      allow_any_instance_of(CountryDashboard).to(
        receive(:display_resource) do |_, resource|
          "Mock #{resource.name}"
        end,
      )
      expect(field.display_associated_resource).to eq("Mock Associated Country")
    end
  end

  describe "class_name option" do
    before do
      allow(Administrate.deprecator).to receive(:warn)
    end

    it "determines the associated_class" do
      line_item = create(:line_item)
      field_class = Administrate::Field::BelongsTo.with_options(
        class_name: "Customer",
      )
      field = field_class.new(
        :product,
        line_item.product,
        :show,
        resource: line_item,
      )
      expect(field.associated_class).to eq(Customer)
    end

    it "uses it to determine how to render the associated resource" do
      product = create(:product, name: "Associated Product")
      line_item = create(:line_item, product: product)
      field_class = Administrate::Field::BelongsTo.with_options(
        class_name: "LineItem",
      )
      field = field_class.new(
        :product,
        line_item.product,
        :show,
        resource: line_item,
      )
      expect(field.display_associated_resource).to match(
        /^Line Item \#\d\d\d\d$/,
      )
    end

    it "triggers a deprecation warning" do
      line_item = create(:line_item)
      field_class = Administrate::Field::BelongsTo.with_options(
        class_name: "Customer",
      )
      field = field_class.new(
        :product,
        line_item.product,
        :show,
        resource: line_item,
      )
      field.associated_class
      expect(Administrate.deprecator).to have_received(:warn).
        with(/:class_name is deprecated/)
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
          resource: customer,
        )
        candidates = field.associated_resource_options

        expect(field.include_blank_option). to eq(true)
        expect(candidates).to eq([])
      end
    end

    context "set value as false" do
      it "determines if choices has blank option or not" do
        customer = create(:customer, territory: nil)
        association = Administrate::Field::BelongsTo.with_options(
          include_blank: false,
        )
        field = association.new(
          :territory,
          [],
          :edit,
          resource: customer,
        )
        candidates = field.associated_resource_options

        expect(field.include_blank_option). to eq(false)
        expect(candidates).to eq([])
      end
    end
  end

  describe "primary_key option" do
    before do
      allow(Administrate.deprecator).to receive(:warn)

      Foo = Class.new
      FooDashboard = Class.new
      uuid = SecureRandom.uuid
      allow(Foo).to receive(:all).and_return([Foo])
      allow(Foo).to receive(:uuid).and_return(uuid)
      allow(Foo).to receive(:id).and_return(1)
      allow_any_instance_of(FooDashboard).to(
        receive(:display_resource).and_return(uuid),
      )
    end

    after do
      remove_constants :Foo, :FooDashboard
    end

    it "is the associated table key that matches our foreign key" do
      association =
        Administrate::Field::BelongsTo.with_options(
          primary_key: "uuid", class_name: "Foo",
        )
      field = association.new(:customers, [], :show)
      field.associated_resource_options

      expect(Foo).to have_received(:all)
      expect(Foo).to have_received(:uuid)
      expect(Foo).not_to have_received(:id)
    end

    it "triggers a deprecation warning" do
      association =
        Administrate::Field::BelongsTo.with_options(
          primary_key: "uuid",
        )
      field = association.new(:foo, double(uuid: nil), :baz)
      field.selected_option

      expect(Administrate.deprecator).to have_received(:warn).
        with(/:primary_key is deprecated/)
    end
  end

  describe "foreign_key option" do
    before do
      allow(Administrate.deprecator).to receive(:warn)
    end

    it "determines what foreign key is used on the relationship for the form" do
      association = Administrate::Field::BelongsTo.with_options(
        foreign_key: "foo_uuid", class_name: "Foo",
      )
      field = association.new(:customers, [], :show)
      permitted_attribute = field.permitted_attribute
      expect(permitted_attribute).to eq("foo_uuid")
    end

    it "triggers a deprecation warning" do
      association = Administrate::Field::BelongsTo.with_options(
        foreign_key: "foo_uuid", class_name: "Foo",
      )
      field = association.new(:customers, [], :show)

      field.permitted_attribute

      expect(Administrate.deprecator).to have_received(:warn).
        with(/:foreign_key is deprecated/)
    end
  end

  describe "#associated_resource_options" do
    context "with `order` option" do
      it "returns the resources in correct order" do
        order = create(:order)
        create_list(:customer, 5)
        options = { order: "name" }
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
          scope: -> { Customer.order(name: :desc) },
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
    end
  end
end
