require "administrate/field/has_many"
require "support/constant_helpers"
require "support/mock_relation"

describe Administrate::Field::HasMany do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      items = double
      field = Administrate::Field::HasMany.new(:items, items, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/has_many/#{page}")
    end
  end

  describe "#associated_collection" do
    it "returns an index page for the dashboard of the associated attribute" do
      begin
        WidgetDashboard = Class.new
        widgets = []
        field = Administrate::Field::HasMany.new(:widgets, widgets, :show)

        page = field.associated_collection

        expect(page).to be_instance_of(Administrate::Page::Collection)
      ensure
        remove_constants :WidgetDashboard
      end
    end
  end

  describe "class_name option" do
    it "determines what dashboard is used to present the association" do
      begin
        FooDashboard = Class.new
        dashboard_double = double(collection_attributes: [])
        allow(FooDashboard).to receive(:new).and_return(dashboard_double)

        association = Administrate::Field::HasMany.
          with_options(class_name: "Foo")
        field = association.new(:customers, [], :show)
        collection = field.associated_collection
        attributes = collection.attribute_names

        expect(dashboard_double).to have_received(:collection_attributes)
        expect(attributes).to eq([])
      ensure
        remove_constants :FooDashboard
      end
    end
  end

  describe "primary_key option" do
    it "determines what primary key is used on the relationship for the form" do
      begin
        Foo = Class.new
        FooDashboard = Class.new
        uuid = SecureRandom.uuid
        allow(Foo).to receive(:all).and_return([Foo])
        allow(Foo).to receive(:uuid).and_return(uuid)
        allow(Foo).to receive(:id).and_return(1)
        allow_any_instance_of(FooDashboard).to(
          receive(:display_resource).and_return(uuid)
        )

        association =
          Administrate::Field::HasMany.with_options(
            primary_key: "uuid", class_name: "Foo"
          )
        field = association.new(:customers, [], :show)
        field.associated_resource_options

        expect(Foo).to have_received(:all)
        expect(Foo).to have_received(:uuid)
        expect(Foo).not_to have_received(:id)
      ensure
        remove_constants :Foo, :FooDashboard
      end
    end
  end

  describe "#more_than_limit?" do
    it "returns true if record count > limit" do
      limit = Administrate::Field::HasMany::DEFAULT_LIMIT
      resources = MockRelation.new([:a] * (limit + 1))

      association = Administrate::Field::HasMany
      field = association.new(:customers, resources, :show)

      expect(field.more_than_limit?).to eq(true)
    end

    it "returns false if record count <= limit" do
      limit = Administrate::Field::HasMany::DEFAULT_LIMIT
      resources = MockRelation.new([:a] * limit)

      association = Administrate::Field::HasMany
      field = association.new(:customers, resources, :show)

      expect(field.more_than_limit?).to eq(false)
    end

    context "when there are no records" do
      it "returns false" do
        resources = nil

        association = Administrate::Field::HasMany
        field = association.new(:customers, resources, :show)

        expect(field.more_than_limit?).to eq(false)
      end
    end
  end

  describe "#resources" do
    it "limits the number of records shown" do
      limit = Administrate::Field::HasMany::DEFAULT_LIMIT
      customer = FactoryBot.create(:customer, :with_orders, order_count: 10)
      resources = customer.orders

      association = Administrate::Field::HasMany
      field = association.new(:orders, resources, :show)

      expect(field.resources.size).to eq(limit)
    end

    context "when there are no records" do
      it "returns an empty collection" do
        resources = nil

        association = Administrate::Field::HasMany
        field = association.new(:customers, resources, :show)

        expect(field.resources).to eq([])
      end
    end

    context "with `limit` option" do
      it "limits the number of items returned" do
        customer = FactoryBot.create(:customer, :with_orders)
        resources = customer.orders

        association = Administrate::Field::HasMany.with_options(limit: 1)
        field = association.new(:orders, resources, :show)

        expect(field.resources).to be_one
      end
    end

    context "with `sort_by` option" do
      it "returns the resources in correct order" do
        customer = FactoryBot.create(:customer, :with_orders)
        options = { sort_by: :address_line_two }
        association = Administrate::Field::HasMany.with_options(options)
        field = association.new(:orders, customer.orders, :show)

        correct_order = customer.orders.sort_by(&:address_line_two).map(&:id)
        reversed_order = customer.orders.sort do |a, b|
          b.address_line_two <=> a.address_line_two
        end

        expect(field.resources.map(&:id)).to eq correct_order
        expect(field.resources.map(&:id)).to_not eq reversed_order.map(&:id)
      end
    end

    context "with `direction` option" do
      it "returns the resources in correct order" do
        customer = FactoryBot.create(:customer, :with_orders)
        options = { sort_by: :address_line_two, direction: :desc }
        association = Administrate::Field::HasMany.with_options(options)
        field = association.new(:orders, customer.orders, :show)

        reversed_order = customer.orders.sort_by(&:address_line_two).map(&:id)
        correct_order = customer.orders.sort do |a, b|
          b.address_line_two <=> a.address_line_two
        end

        expect(field.resources.map(&:id)).to eq correct_order.map(&:id)
        expect(field.resources.map(&:id)).to_not eq reversed_order
      end
    end
  end

  describe "#selected_options" do
    it "returns a collection of primary keys" do
      model = double("model", id: 123)
      resources = MockRelation.new([model])

      association = Administrate::Field::HasMany
      field = association.new(:customers, resources, :show)

      expect(field.selected_options).to eq([123])
    end

    context "when there are no records" do
      it "returns an empty collection" do
        resources = nil

        association = Administrate::Field::HasMany
        field = association.new(:customers, resources, :show)

        expect(field.selected_options).to be_nil
      end
    end
  end
end
