class AddTimestampToPayments < ActiveRecord::Migration[5.1]
  def change
    change_table(:payments, &:timestamps)
  end
end
