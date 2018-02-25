require "rails_helper"
require "administrate/field/belongs_to"
require "support/constant_helpers"
require "support/field_matchers"

describe Administrate::Field::BelongsTo do
  include FieldMatchers

  it { should_permit_param(:foo_id, for_attribute: :foo) }

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      owner = double
      field = Administrate::Field::BelongsTo.new(:owner, owner, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/belongs_to/#{page}")
    end
  end

  describe "class_name option" do
    it "determines what dashboard is used to present the association" do
      begin
        Foo = Class.new
        allow(Foo).to receive(:all).and_return([])

        association = Administrate::Field::BelongsTo.with_options(
          class_name: "Foo",
        )
        field = association.new(:customers, [], :show)
        candidates = field.associated_resource_options

        expect(Foo).to have_received(:all)
        expect(candidates).to eq([nil])
      ensure
        remove_constants :Foo
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
          Administrate::Field::BelongsTo.with_options(
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

  describe "foreign_key option" do
    it "determines what foreign key is used on the relationship for the form" do
      association = Administrate::Field::BelongsTo.with_options(
        foreign_key: "foo_uuid", class_name: "Foo",
      )
      field = association.new(:customers, [], :show)
      permitted_attribute = field.permitted_attribute
      expect(permitted_attribute).to eq("foo_uuid")
    end
  end

  describe "#resources" do
    context "with `order` option" do
      it "returns the resources in correct order" do
        FactoryBot.create_list(:customer, 5)
        options = { order: "name" }
        association = Administrate::Field::BelongsTo.with_options(options)
        field = association.new(:customers, [], :view)

        correct_order = Customer.order("name").pluck(:id)

        resources = field.associated_resource_options.compact.to_h.values
        expect(resources).to eq correct_order
      end

      it "rejects order passed in `scope`" do
        FactoryBot.create_list(:customer, 3)
        options = {
          order: "name",
          scope: -> { Customer.order(name: :desc) },
        }
        association = Administrate::Field::BelongsTo.with_options(options)
        field = association.new(:customers, [], :view)

        correct_order = Customer.order("name").pluck(:id)

        resources = field.associated_resource_options.compact.to_h.values
        expect(resources).to eq correct_order
      end
    end

    context "with `scope` option" do
      it "returns the resources within the passed scope" do
        1.upto(3) { |i| FactoryBot.create :customer, name: "customer-#{i}" }
        scope = -> { Customer.order(name: :desc).limit(2) }

        association = Administrate::Field::BelongsTo.with_options(scope: scope)
        field = association.new(:customers, [], :view)
        resources = field.associated_resource_options.compact.to_h.keys

        expect(resources).to eq ["customer-3", "customer-2"]
      end
    end
  end
end
