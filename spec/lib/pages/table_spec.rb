require "rails_helper"
require "administrate/page/collection"

describe Administrate::Page::Collection do
  describe "#resources" do
    context "when dashoboard of associated resource has decorator method" do
      include_context "OrderDashboard uses decoration"

      it "returns decorated resources" do
        page = described_class.new(
          OrderDashboard.new,
          resources: create_list(:order, 2)
        )

        expect(page.resources.first.class).to eq(order_decorator_class)
      end
    end
  end
end
