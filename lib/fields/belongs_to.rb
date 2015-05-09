require_relative "base"

module Field
  class BelongsTo < Field::Base
    def self.permitted_attribute(attr)
      :"#{attr}_id"
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
end
