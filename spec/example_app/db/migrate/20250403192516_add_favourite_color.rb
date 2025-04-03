class AddFavouriteColor < ActiveRecord::Migration[8.0]
  def change
    add_column :customers, :favourite_color, :string
  end
end
