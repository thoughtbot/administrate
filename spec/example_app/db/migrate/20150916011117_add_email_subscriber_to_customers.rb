class AddEmailSubscriberToCustomers < ActiveRecord::Migration[4.2]
  def change
    add_column :customers, :email_subscriber, :boolean
  end
end
