class ProductMetaTag < ApplicationRecord
  belongs_to :product

  validates :meta_title, :meta_description, presence: true
end
