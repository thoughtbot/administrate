class CreateProducts < ActiveRecord::Migration[4.2]
  def change
    create_table :products do |t|
      t.string :name
      t.float :price
      t.text :description
      t.string :image_url

      t.timestamps null: false
    end
  end
end
