class Country < ApplicationRecord
  validates :code, :name, presence: true
end
