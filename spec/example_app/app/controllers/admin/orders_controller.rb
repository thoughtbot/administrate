module Admin
  class OrdersController < Admin::ApplicationController
    def belongs_to_sorting_attribute
      :name
    end
  end
end
