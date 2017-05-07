class AddBirthdateToCustomer < ActiveRecord::Migration
  def change
    add_column :customers, :birthdate, :date
  end
end
