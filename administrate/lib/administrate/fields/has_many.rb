require_relative "base"
require "administrate/page/table"

module Administrate
  module Field
    class HasMany < Field::Base
      DEFAULT_LIMIT = 5

      def self.permitted_attribute(attribute)
        { "#{attribute.to_s.singularize}_ids".to_sym => [] }
      end

      def associated_table
        Administrate::Page::Table.new(associated_dashboard)
      end

      def attribute_key
        permitted_attribute.keys.first
      end

      def candidate_records
        Object.const_get(associated_class_name).all
      end

      def limit
        options.fetch(:limit, DEFAULT_LIMIT)
      end

      def permitted_attribute
        self.class.permitted_attribute(attribute)
      end

      def resources
        data.limit(limit)
      end

      private

      def associated_dashboard
        Object.const_get("#{associated_class_name}Dashboard").new
      end

      def associated_class_name
        options.fetch(:class_name, attribute.to_s.singularize.camelcase)
      end
    end
  end
end
