module Admin
  class LogEntriesController < Admin::ApplicationController
    def filter_resources(resources, search_term:)
      return resources if search_term.blank?

      customer_ids = Customer.where(
        [
          "name ILIKE ?",
          "%#{search_term}%",
        ],
      ).pluck(:id)
      order_ids = Order.joins(:customer).where(
        [
          "customers.name ILIKE ?",
          "%#{search_term}%",
        ],
      ).pluck(:id)

      customers_filter = resources.where(
        logeable_type: "Customer",
        logeable_id: customer_ids,
      )
      orders_filter = resources.where(
        logeable_type: "Order",
        logeable_id: order_ids,
      )
      customers_filter.or(orders_filter)
    end
  end
end
