class AddExampleTimeToCustomer < ActiveRecord::Migration[5.1]
  def change
    add_column :customers, :example_time, :time
  end
end
