class Customer < ActiveRecord::Base
  has_many :orders, dependent: :destroy
  belongs_to :country, foreign_key: :country_code, primary_key: :code
  has_many :log_entries, as: :logeable

  validates :name, presence: true
  validates :email, presence: true

  KINDS = [
    :standard,
    :vip,
  ].freeze

  def lifetime_value
    orders.map(&:total_price).reduce(0, :+)
  end
end
