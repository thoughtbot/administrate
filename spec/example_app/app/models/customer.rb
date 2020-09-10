class Customer < ApplicationRecord
  has_many :orders, dependent: :destroy
  belongs_to(
    :territory,
    class_name: "Country",
    foreign_key: :country_code,
    primary_key: :code,
  )
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

  class Index < Customer
    self.table_name = "customers_index"

    def readonly?
      true
    end

    def to_model
      becomes(Customer)
    end

    def lifetime_value
      read_attribute(:lifetime_value)
    end
  end
end
