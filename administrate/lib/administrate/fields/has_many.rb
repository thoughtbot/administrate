require_relative "base"
require "administrate/page/table"

module Administrate
  module Field
    class HasMany < Field::Base
      def associated_table
        Administrate::Page::Table.new(associated_dashboard)
      end

      def self.permitted_attribute(attribute)
        { "#{attribute.to_s.singularize}_ids".to_sym => [] }
      end

      def permitted_attribute
        self.class.permitted_attribute(attribute)
      end

      def attribute_key
        permitted_attribute.keys.first
      end

      def candidate_records
        Object.const_get(resource_class_name).all.map do |resource|
          ResourceDecorator.new(resource)
        end
      end

      private

      def associated_dashboard
        Object.const_get("#{resource_class_name}Dashboard").new
      end

      def resource_class_name
        @options[:class_name] || attribute.to_s.singularize.camelcase
      end
    end
  end
end
