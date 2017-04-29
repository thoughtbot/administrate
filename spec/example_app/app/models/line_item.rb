class LineItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  validates :product, presence: true
  validates :order, presence: true
  validates :unit_price, presence: true
  validates :quantity, presence: true

  def total_price
    unit_price * quantity
  end
end
