class AddCodeToOrders < ActiveRecord::Migration
  def change
    rename_column :orders, :id, :code
    rename_column :payments, :order_id, :order_code
  end
end
