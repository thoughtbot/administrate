class CreateProductMetaTags < ActiveRecord::Migration
  def change
    create_table :product_meta_tags do |t|
      t.belongs_to :product
      t.string :meta_title, null: false
      t.string :meta_description, null: false

      t.timestamps null: false
    end
  end
end
