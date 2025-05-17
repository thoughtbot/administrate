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
        @resource_path ||= resource_name.tr("/", "_")
      end

      def collection_includes
        dashboard.try(:collection_includes) || []
      end

      def item_includes
        dashboard.try(:item_includes) || []
      end

      def item_associations
        dashboard.try(:item_associations) || []
      end

      attr_accessor :context

      def dashboard_context=(context)
        dashboard.context = context
      end

      private

      def attribute_field(dashboard, resource, attribute_name, page)
        field = dashboard.attribute_type_for(attribute_name)
        field.new(attribute_name, nil, page, resource: resource).tap do |f|
          f.context = context
        end
      end

      def get_attribute_value(resource, attribute_name)
        resource.public_send(attribute_name)
      end

      attr_reader :dashboard, :options
    end
  end
end
