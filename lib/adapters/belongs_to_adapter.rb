require_relative "base_adapter"

class BelongsToAdapter < BaseAdapter
  def self.permitted_attribute(attr)
    :"#{attr}_id"
  end

  def adapter_name
    :belongs_to
  end

  def permitted_attribute
    self.class.permitted_attribute(attribute)
  end

  def candidate_records
    Object.const_get(attribute.to_s.camelcase).all
  end

  private

  def url_to_data
    Rails.application.routes.url_helpers.public_send(data_path_helper, data)
  end

  def data_path_helper
    "#{data.class.to_s.underscore}_path"
  end
end
