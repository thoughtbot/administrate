class ChangeProductsPriceToDecimal < ActiveRecord::Migration[7.0]
  def up
    change_column :products, :price, :decimal, precision: 15, scale: 2
  end

  def down
    change_column :products, :price, :float
  end
end
