require "rails_helper"

describe CustomerDashboard do
  describe "#collection_attributes" do
    it "includes the name and email" do
      dashboard = CustomerDashboard.new

      expect(dashboard.collection_attributes).to include(:name)
      expect(dashboard.collection_attributes).to include(:email)
    end
  end

  describe "#attribute_types" do
    it "maps each attribute to an attribute field" do
      Field = Administrate::Field
      dashboard = CustomerDashboard.new

      fields = dashboard.attribute_types

      expect(fields[:name]).to eq(Field::String)
      expect(fields[:email]).to eq(Field::Email)
      expect(fields[:lifetime_value]).
        to eq(Field::Number.with_options(prefix: "$", decimals: 2))
    end
  end

  def missing_attribute_message(attribute, dashboard_class)
    "Attribute #{attribute} could not be found in #{dashboard_class}::ATTRIBUTE_TYPES"
  end

  describe "#attribute_type_for" do
    context "for an existing attribute" do
      it "returns the attribute field" do
        dashboard = CustomerDashboard.new
        field = dashboard.attribute_type_for(:name)
        expect(field).to eq Administrate::Field::String
      end
    end

    context "for a non-existent attribute" do
      it "raises an exception" do
        dashboard = CustomerDashboard.new
        expect { dashboard.attribute_type_for(:foo) }.
          to raise_error missing_attribute_message("foo", "CustomerDashboard")
      end
    end
  end

  describe "#attribute_types_for" do
    context "for existing attributes" do
      it "returns the attribute fields" do
        dashboard = CustomerDashboard.new
        fields = dashboard.attribute_types_for([:name, :email])
        expect(fields).to match(
          name: Administrate::Field::String,
          email: Administrate::Field::Email,
        )
      end
    end

    context "for one non-existent attribute" do
      it "raises an exception" do
        dashboard = CustomerDashboard.new
        expect { dashboard.attribute_types_for([:name, :foo]) }.
          to raise_error missing_attribute_message("foo", "CustomerDashboard")
      end
    end
  end

  describe "#display_resource" do
    it "returns the customer's name" do
      customer = double(name: "Example Customer")
      dashboard = CustomerDashboard.new

      rendered_resource = dashboard.display_resource(customer)

      expect(rendered_resource).to eq(customer.name)
    end
  end
end
