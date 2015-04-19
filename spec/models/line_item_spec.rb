require "rails_helper"

describe LineItem do
  it { should validate_presence_of :product }
  it { should validate_presence_of :order }
  it { should validate_presence_of :unit_price }
  it { should validate_presence_of :quantity }

  describe "#total_price" do
    it "is the product of the unit price and the quantity" do
      item = build(:line_item, unit_price: 20, quantity: 2)

      expect(item.total_price).to eq 40
    end
  end
end
