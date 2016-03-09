class Customer < ActiveRecord::Base
  has_many :orders

  validates :name, presence: true
  validates :email, presence: true

  scope :subscribed, -> { where(email_subscriber: true) }

  def lifetime_value
    orders.map(&:total_price).reduce(0, :+)
  end
end
