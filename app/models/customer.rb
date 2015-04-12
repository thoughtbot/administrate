class Customer < ActiveRecord::Base
  validates :name, presence: true
  validates :email, presence: true

  def lifetime_value
    "$#{rand(100)}"
  end

  def to_s
    name
  end
end
