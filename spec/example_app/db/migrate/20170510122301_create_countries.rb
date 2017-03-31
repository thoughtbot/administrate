class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :code
      t.string :name

      t.timestamps null: false
    end
    add_index :countries, :code, unique: true
    add_column :customers, :country_code, :string, index: true
  end
end
