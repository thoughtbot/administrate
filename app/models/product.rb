class Product < ActiveRecord::Base
  validates :description, presence: true
  validates :image_url, presence: true
  validates :name, presence: true
  validates :price, presence: true
end
