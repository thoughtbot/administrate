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
        Object.const_get(associated_class_name).all
      end

      private

      def associated_class_name
        options.fetch(:class_name, attribute.to_s.camelcase)
      end
    end
  end
end
