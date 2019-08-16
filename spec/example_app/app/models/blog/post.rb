module Blog
  class Post < ApplicationRecord
    validates :title, :body, presence: true
  end
end
