require "rails_helper"

RSpec.describe CustomerDashboard do
  describe "#index_page_attributes" do
    it "includes the name and email" do
      dashboard = CustomerDashboard.new

      expect(dashboard.index_page_attributes).to include(:name)
      expect(dashboard.index_page_attributes).to include(:email)
    end
  end

  describe "#attribute_adapters" do
    it "maps each attribute to an adapter" do
      dashboard = CustomerDashboard.new

      expect(dashboard.attribute_adapters[:name]).to eq :string
      expect(dashboard.attribute_adapters[:email]).to eq :email
      expect(dashboard.attribute_adapters[:lifetime_value]).to eq :string
    end
  end
end
