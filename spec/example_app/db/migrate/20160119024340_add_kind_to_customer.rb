class AddKindToCustomer < ActiveRecord::Migration
  def change
    add_column :customers, :kind, :string, null: false, default: "standard"
  end
end
