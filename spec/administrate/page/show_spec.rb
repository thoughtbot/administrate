require "rails_helper"
require "administrate/page/base"

describe Administrate::Page::Show do
  describe "#attributes" do
    let(:customer) { FactoryBot.create(:customer, :with_orders, order_count: 4) }

    before { customer }

    it "returns ActiveRecord::Associations::CollectionProxy data for a has_many field type" do
      dashboard = CustomerDashboard.new
      dashboard_page = Administrate::Page::Show.new(dashboard, customer)
      orders_field = dashboard_page.attributes.select { |field| field.attribute == :orders }.first

      expect(orders_field.data).to be_an ActiveRecord::Associations::CollectionProxy
    end
  end
end
