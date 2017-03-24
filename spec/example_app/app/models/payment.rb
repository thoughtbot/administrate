class Payment < ActiveRecord::Base
  belongs_to :order, foreign_key: :order_code, primary_key: :code
end
