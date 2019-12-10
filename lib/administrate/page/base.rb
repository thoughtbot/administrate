module Administrate
  module Page
    class Base
      def initialize(dashboard, options = {})
        @dashboard = dashboard
        @options = options
      end

      def resource_name
        @resource_name ||=
          dashboard.class.to_s.scan(/(.+)Dashboard/).first.first.underscore
      end

      def resource_path
        @resource_path ||= resource_name.gsub("/", "_")
      end

      def collection_includes
        dashboard.try(:collection_includes) || []
      end

      def item_includes
        dashboard.try(:item_includes) || []
      end

      protected

      def attribute_field(dashboard, resource, attribute_name, page)
        value = get_attribute_value(resource, attribute_name)
        field = dashboard.attribute_type_for(attribute_name)
        value = value.size if use_count_value?(page, field)
        field.new(attribute_name, value, page, resource: resource)
      end

      def get_attribute_value(resource, attribute_name)
        resource.public_send(attribute_name)
      end

      def use_count_value?(page, field)
        return false unless page == :index

        has_many_field?(field)
      end

      def has_many_field?(field)
        field.is_a?(Administrate::Field::HasMany) ||
          (field.is_a?(Administrate::Field::Deferred) && field.deferred_class == Administrate::Field::HasMany)
      end

      attr_reader :dashboard, :options
    end
  end
end
