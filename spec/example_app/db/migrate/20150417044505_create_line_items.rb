class CreateLineItems < ActiveRecord::Migration[4.2]
  def change
    create_table :line_items do |t|
      t.references :order, index: true
      t.references :product, index: true
      t.float :unit_price
      t.integer :quantity

      t.timestamps null: false
    end
    add_foreign_key :line_items, :orders
    add_foreign_key :line_items, :products
  end
end
