require "rails_helper"

describe Administrate::Page::Collection do
  describe "#resources" do
    context "when dashboard of associated resource has decorator method" do
      it "returns decorated resources" do
        order = FactoryBot.create(:order,
                                  address_city: "San Francisco",
                                  address_state: "CA")
        page = described_class.new(OrderDashboard.new, [order])

        expect(page.resources.first.address).to eq("San Francisco, California")
      end
    end
  end
end
