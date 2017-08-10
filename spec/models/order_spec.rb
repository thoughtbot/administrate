require "rails_helper"

RSpec.describe Order do
  it { should belong_to :customer }

  describe "validations" do
    it { should validate_presence_of(:customer) }

    it { should validate_presence_of(:address_line_one) }
    it { should validate_presence_of(:address_line_two) }
    it { should validate_presence_of(:address_city) }
    it { should validate_presence_of(:address_state) }
    it { should validate_presence_of(:address_zip) }
  end

  it "deletes associated line_items when deleted itself" do
    product = create(:product)
    customer = create(:customer)
    order = create(:order, customer: customer)
    create(:line_item, product: product, order: order)

    order.destroy

    expect(LineItem.all).to be_empty
  end

  it "raise error when try delete associated payment" do
    order = create(:order)
    create(:payment, order: order)

    order.destroy

    expect(order.errors[:base]).to eq(
      ["Cannot delete record because dependent payments exist"],
    )
  end

  describe "#total_price" do
    it "returns 0 when there are no line items" do
      order = build(:order)

      expect(order.total_price).to eq 0
    end

    it "sums the prices of each line item" do
      order = build(:order)
      order.line_items = [
        line_item_stub(total_price: 20),
        line_item_stub(total_price: 30),
      ]

      expect(order.total_price).to eq 50
    end
  end

  def line_item_stub(options)
    build(:line_item).tap do |line_item|
      options.each do |method, result|
        allow(line_item).to receive(method).and_return(result)
      end
    end
  end
end
