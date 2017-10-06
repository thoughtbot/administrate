class AddPasswordToCustomers < ActiveRecord::Migration[4.2]
  def change
    add_column :customers, :password, :string
  end
end
