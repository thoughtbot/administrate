class Order < ActiveRecord::Base
  belongs_to :customer

  validates :customer, presence: true
  has_many :line_items, dependent: :destroy
  has_many :payments, dependent: :restrict_with_error
  has_many :log_entries, as: :logeable

  validates :address_line_one, presence: true
  validates :address_line_two, presence: true
  validates :address_city, presence: true
  validates :address_state, presence: true
  validates :address_zip, presence: true

  def total_price
    line_items.map(&:total_price).reduce(0, :+)
  end
end
