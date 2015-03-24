require "rails_helper"

RSpec.describe CustomerDashboard do
  describe "#title_attribute" do
    it "is the name" do
      dashboard = CustomerDashboard.new

      expect(dashboard.title_attribute).to eq(:name)
    end
  end

  describe "#index_page_attributes" do
    it "includes the name and email" do
      dashboard = CustomerDashboard.new

      expect(dashboard.index_page_attributes).to include(:name)
      expect(dashboard.index_page_attributes).to include(:email)
    end
  end
end
