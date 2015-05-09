require "rails_helper"

RSpec.describe CustomerDashboard do
  describe "#index_page_attributes" do
    it "includes the name and email" do
      dashboard = CustomerDashboard.new

      expect(dashboard.index_page_attributes).to include(:name)
      expect(dashboard.index_page_attributes).to include(:email)
    end
  end

  describe "#attribute_types" do
    it "maps each attribute to an attribute field" do
      dashboard = CustomerDashboard.new

      expect(dashboard.attribute_types[:name]).to eq(:string)
      expect(dashboard.attribute_types[:email]).to eq(:email)
      expect(dashboard.attribute_types[:lifetime_value]).to eq(:string)
    end
  end
end
