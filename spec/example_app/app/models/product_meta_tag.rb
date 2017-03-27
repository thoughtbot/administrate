class ProductMetaTag < ActiveRecord::Base
  belongs_to :product

  validates :meta_title, presence: true
  validates :meta_description, presence: true
end
