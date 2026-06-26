class Customer < ApplicationRecord
  has_many :orders, dependent: :destroy
  belongs_to(
    :territory,
    class_name: "Country",
    foreign_key: :country_code,
    primary_key: :code,
    optional: true
  )
  has_many :log_entries, as: :logeable

  validates :name, presence: true
  validates :email, presence: true

  if Rails.gem_version >= Gem::Version.new("7.0")
    enum :kind, {"standard" => "kind:std", "vip" => "kind:vip"}, default: "standard"
  else
    enum kind: {"standard" => "kind:std", "vip" => "kind:vip"}
  end

  def admin?
    false
  end

  def lifetime_value
    orders.map(&:total_price).reduce(0, :+)
  end
end
