require "rails_helper"

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
    context "when dashboard of associated resource has decorator method" do
      it "returns decorated resource" do
        order = FactoryBot.create(:order,
                                  address_city: "San Francisco",
                                  address_state: "CA")
        page = described_class.new(OrderDashboard.new, order)

        expect(page.resource.address).to eq("San Francisco, California")
      end
    end
  end
end
