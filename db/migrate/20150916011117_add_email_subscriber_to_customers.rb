class AddEmailSubscriberToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :email_subscriber, :boolean
  end
end
