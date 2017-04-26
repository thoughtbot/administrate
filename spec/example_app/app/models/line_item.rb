class LineItem < ActiveRecord::Base
  belongs_to :order
  belongs_to :product, class_name: "Catalog::Product"

  validates :product, presence: true
  validates :order, presence: true
  validates :unit_price, presence: true
  validates :quantity, presence: true

  def total_price
    unit_price * quantity
  end
end
