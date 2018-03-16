require "rails_helper"
require "administrate/page/show"

describe Administrate::Page::Show do
  describe "#page_title" do
    it "is the stringified resource" do
      customer = double(name: "Worf")
      page = Administrate::Page::Show.new(CustomerDashboard.new, customer)

      expect(page.page_title).to eq("Worf")
    end
  end

  describe "#attributes" do
    it "passes the resource to the field object" do
      customer = double(name: "Worf").as_null_object
      page = Administrate::Page::Show.new(CustomerDashboard.new, customer)

      expect(page.attributes.first.resource).to eq(customer)
      expect(page.attributes.first.resource.name).to eq("Worf")
    end
  end

  describe "#resource" do
    context "when dashoboard of associated resource has decorator method" do
      include_context "OrderDashboard uses decoration"

      it "returns decorated resource" do
        page = described_class.new(OrderDashboard.new, create(:order))

        expect(page.resource.class).to eq(order_decorator_class)
      end
    end
  end
end
