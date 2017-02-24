class AddExampleTimeToCustomer < ActiveRecord::Migration
  def change
    add_column :customers, :example_time, :time
  end
end
