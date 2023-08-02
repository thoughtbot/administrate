class ChangeLineItemsUnitPriceToDecimal < ActiveRecord::Migration[7.0]
  def up
    change_column :line_items, :unit_price, :decimal, precision: 15, scale: 2
  end

  def down
    change_column :line_items, :unit_price, :float
  end
end
