class AddBirthDateToCustomer < ActiveRecord::Migration[5.1]
  def change
    add_column :customers, :birth_date, :date
  end
end
