class CreateProductsIndex < ActiveRecord::Migration[6.0]
  def change
    create_view :products_index
  end
end
