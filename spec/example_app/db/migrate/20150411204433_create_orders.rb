class CreateOrders < ActiveRecord::Migration[4.2]
  def change
    create_table :orders do |t|
      t.references :customer, index: true
      t.string :address_line_one
      t.string :address_line_two
      t.string :address_city
      t.string :address_state
      t.string :address_zip

      t.timestamps null: false
    end
    add_foreign_key :orders, :customers
  end
end
