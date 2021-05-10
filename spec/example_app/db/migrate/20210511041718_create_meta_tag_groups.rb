class CreateMetaTagGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :meta_tag_groups do |t|
      t.string :name

      t.timestamps
    end
  end
end
