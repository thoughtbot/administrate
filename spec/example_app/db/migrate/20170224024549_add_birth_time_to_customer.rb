class AddBirthTimeToCustomer < ActiveRecord::Migration[5.1]
  def change
    add_column :customers, :birth_time, :time
  end
end
