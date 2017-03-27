class CreateProductMetaTags < ActiveRecord::Migration
  def change
    create_table :product_meta_tags do |t|
      t.belongs_to :product
      t.string :meta_title
      t.string :meta_description

      t.timestamps null: false
    end
  end
end
