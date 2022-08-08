module Blog
  class Post < ApplicationRecord
    has_and_belongs_to_many :tags

    validates :title, :body, presence: true
  end
end
