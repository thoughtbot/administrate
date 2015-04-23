require 'rails_helper'

RSpec.describe Customer, :type => :model do
  it { should have_many :orders }

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }

  describe "#lifetime_value" do
    it "returns 0 for no orders" do
      customer = Customer.new

      expect(customer.lifetime_value).to eq 0
    end

    it "sums the total_price of all orders" do
      customer = Customer.new orders: [
        order_stub(total_price: 20),
        order_stub(total_price: 30),
      ]

      expect(customer.lifetime_value).to eq 50
    end
  end

  def order_stub(options)
    build(:order).tap do |order|
      options.each do |method, result|
        allow(order).to receive(method).and_return(result)
      end
    end
  end
end
