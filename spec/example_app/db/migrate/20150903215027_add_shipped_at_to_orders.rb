class AddShippedAtToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :shipped_at, :datetime
  end
end
