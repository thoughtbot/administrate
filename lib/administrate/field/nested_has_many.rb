require_relative "has_many"
require "administrate/page/form"

module Administrate
  module Field
    class NestedHasMany < Administrate::Field::HasMany
      DEFAULT_ATTRIBUTES = [:id, :_destroy].freeze

      def to_s
        data
      end

      def self.dashboard_for_resource(resource)
        "#{resource.to_s.classify}Dashboard".constantize
      end

      def self.associated_attributes(associated_resource)
        DEFAULT_ATTRIBUTES +
          dashboard_for_resource(associated_resource).new.permitted_attributes
      end

      def self.permitted_attribute(associated_resource)
        {
          "#{associated_resource}_attributes".to_sym =>
          associated_attributes(associated_resource)
        }
      end

      def associated_class_name
        options.fetch(:class_name, attribute.to_s.singularize.camelcase)
      end

      def association_name
        associated_class_name.underscore.pluralize
      end

      def associated_form
        Administrate::Page::Form.new(associated_dashboard, association_name)
      end
    end
  end
end
