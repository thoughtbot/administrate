class AddKindToCustomer < ActiveRecord::Migration[4.2]
  def change
    add_column :customers, :kind, :string, null: false, default: "standard"
  end
end
