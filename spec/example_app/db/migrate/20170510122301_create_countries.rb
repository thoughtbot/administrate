class CreateCountries < ActiveRecord::Migration[4.2]
  def change
    create_table :countries do |t|
      t.string :code, null: false, index: { unique: true }
      t.string :name

      t.timestamps null: false
    end
    add_column :customers, :country_code, :string, index: true
  end
end
