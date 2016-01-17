class Series < ActiveRecord::Base
  validates :name, presence: true
end
