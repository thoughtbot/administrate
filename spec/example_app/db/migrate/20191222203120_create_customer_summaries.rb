class CreateCustomerSummaries < ActiveRecord::Migration[6.0]
  def change
    create_view :customers_index
  end
end
