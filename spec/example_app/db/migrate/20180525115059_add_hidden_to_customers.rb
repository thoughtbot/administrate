class AddHiddenToCustomers < ActiveRecord::Migration[5.1]
  def change
    add_column :customers, :hidden, :boolean, default: false, null: false
  end
end
