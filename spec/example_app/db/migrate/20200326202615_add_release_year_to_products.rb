class AddReleaseYearToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :release_year, :integer, limit: 2
  end
end
