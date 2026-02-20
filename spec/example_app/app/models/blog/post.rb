module Blog
  class Post < ApplicationRecord
    has_and_belongs_to_many :tags

    has_one_attached :cover_image
    has_many_attached :images

    validates :title, :body, presence: true
  end
end
