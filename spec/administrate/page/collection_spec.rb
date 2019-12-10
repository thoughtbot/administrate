require "rails_helper"
require "administrate/page/base"

describe Administrate::Page::Collection do
  describe "#attributes_for" do
    let(:customer) { FactoryBot.create(:customer, :with_orders, order_count: 4) }

    before { customer }

    it "returns Integer data for a has_many field type" do
      dashboard = CustomerDashboard.new
      dashboard_page = Administrate::Page::Collection.new(dashboard)
      orders_field = dashboard_page.attributes_for(customer).select { |field| field.attribute == :orders }.first

      expect(orders_field.data).to be_an Integer
    end

    it "returns the correct object count for a has_many field type" do
      dashboard = CustomerDashboard.new
      dashboard_page = Administrate::Page::Collection.new(dashboard)
      orders_field = dashboard_page.attributes_for(customer).select { |field| field.attribute == :orders }.first

      expect(orders_field.data).to eq 4
    end
  end
end
