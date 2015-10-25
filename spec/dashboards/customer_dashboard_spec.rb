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
end
