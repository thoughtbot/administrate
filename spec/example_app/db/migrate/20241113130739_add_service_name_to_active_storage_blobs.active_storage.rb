# This migration comes from active_storage (originally 20190112182829)
class AddServiceNameToActiveStorageBlobs < ActiveRecord::Migration[8.0]
  def up
    return unless table_exists?(:active_storage_blobs)

    unless column_exists?(:active_storage_blobs, :service_name)
      add_column :active_storage_blobs, :service_name, :string

      if (configured_service = ActiveStorage::Blob.service.name)
        ActiveStorage::Blob.unscoped.update_all(service_name: configured_service)
      end

      change_column :active_storage_blobs, :service_name, :string, null: false
    end
  end

  def down
    return unless table_exists?(:active_storage_blobs)

    remove_column :active_storage_blobs, :service_name
  end
end
