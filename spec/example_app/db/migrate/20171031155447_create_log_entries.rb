class CreateLogEntries < ActiveRecord::Migration[5.1]
  def change
    create_table :log_entries do |t|
      t.string :action
      t.references :logeable, polymorphic: true, index: true

      t.timestamps null: false
    end
  end
end
