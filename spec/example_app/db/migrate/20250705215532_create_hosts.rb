class CreateHosts < ActiveRecord::Migration[8.0]
  def change
    create_table :hosts do |t|
      t.string :name

      t.timestamps
    end
  end
end
