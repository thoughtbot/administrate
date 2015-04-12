require "rails_helper"

describe CustomerDashboard do
  describe "#permitted_attributes" do
    it "returns the attribute name by default" do
      dashboard = OrderDashboard.new

      expect(dashboard.permitted_attributes).to include(:address_line_one)
    end

    it "returns the attribute_id name for belongs_to relationships" do
      dashboard = OrderDashboard.new

      expect(dashboard.permitted_attributes).to include(:customer_id)
    end
  end
end
