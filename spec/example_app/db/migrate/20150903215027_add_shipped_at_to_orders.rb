class AddShippedAtToOrders < ActiveRecord::Migration[4.2]
  def change
    add_column :orders, :shipped_at, :datetime
  end
end
