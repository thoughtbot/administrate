require "rails_helper"
require "administrate/page/base"

describe Administrate::Page::Base do
  describe "#resource_name" do
    it "returns a resource name from the dashboard" do
      dashboard = OrderDashboard.new
      dashboard_page = Administrate::Page::Base.new(dashboard)

      expect(dashboard_page.resource_name).to eq "order"
    end

    it "returns a string for a namespaced resource path" do
      dashboard = OrderDashboard.new
      dashboard_page = Administrate::Page::Base.new(dashboard)

      expect(dashboard_page.resource_path).to eq "order"
    end

    context "when provided a namespaced dashboard" do
      it "returns a namespaced resource name from the dashboard" do
        dashboard = Logged::OrderDashboard.new
        dashboard_page = Administrate::Page::Base.new(dashboard)

        expect(dashboard_page.resource_name).to eq "logged/order"
      end

      it "returns a string for a namespaced resource path" do
        dashboard = Logged::OrderDashboard.new
        dashboard_page = Administrate::Page::Base.new(dashboard)

        expect(dashboard_page.resource_path).to eq "logged_order"
      end
    end
  end
end
