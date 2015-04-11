class Order < ActiveRecord::Base
  belongs_to :customer

  validates :customer, presence: true

  validates :address_line_one, presence: true
  validates :address_line_two, presence: true
  validates :address_city, presence: true
  validates :address_state, presence: true
  validates :address_zip, presence: true
end
