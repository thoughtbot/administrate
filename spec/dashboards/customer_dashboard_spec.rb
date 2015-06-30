require "rails_helper"

describe CustomerDashboard do
  describe "#table_attributes" do
    it "includes the name and email" do
      dashboard = CustomerDashboard.new

      expect(dashboard.table_attributes).to include(:name)
      expect(dashboard.table_attributes).to include(:email)
    end
  end

  describe "#attribute_types" do
    it "maps each attribute to an attribute field" do
      dashboard = CustomerDashboard.new

      fields = dashboard.attribute_types

      expect(fields[:name]).to eq(Administrate::Field::String)
      expect(fields[:email]).to eq(Administrate::Field::Email)
      expect(fields[:lifetime_value]).to eq(Administrate::Field::String)
    end
  end
end
