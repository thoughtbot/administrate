class ProductMetaTag < ApplicationRecord
  belongs_to :product
  belongs_to :meta_tag_groups

  validates :meta_title, :meta_description, presence: true
end
