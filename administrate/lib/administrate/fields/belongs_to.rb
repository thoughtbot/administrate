require_relative "base"

module Administrate
  module Field
    class BelongsTo < Field::Base
      def self.permitted_attribute(attr)
        :"#{attr}_id"
      end

      def permitted_attribute
        self.class.permitted_attribute(attribute)
      end

      def candidate_records
        Object.const_get(attribute.to_s.camelcase).all.map do |resource|
          ResourceDecorator.new(resource)
        end
      end

      def decorated_data
        ResourceDecorator.new(data)
      end
    end
  end
end
