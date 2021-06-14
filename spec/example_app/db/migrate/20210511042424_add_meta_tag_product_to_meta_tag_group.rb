class AddMetaTagProductToMetaTagGroup < ActiveRecord::Migration[6.1]
  def change
    add_column :product_meta_tags, :meta_tag_group_id, :integer, null: true
    add_index  :product_meta_tags, :meta_tag_group_id
  end
end
