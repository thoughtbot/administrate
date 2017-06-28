class CreatePayments < ActiveRecord::Migration[4.2]
  def change
    create_table :payments do |t|
      t.references :order, index: true
    end
    add_foreign_key :payments, :orders
  end
end
