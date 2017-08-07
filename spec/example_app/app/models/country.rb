class Country < ActiveRecord::Base
  validates :code, :name, presence: true
end
