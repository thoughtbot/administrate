module Admin
  class StatsController < Admin::ApplicationController
    def index
      @stats = {
        customer_count: Customer.count,
        order_count: Order.count,
      }
    end
  end
end
