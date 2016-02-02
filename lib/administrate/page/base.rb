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

      protected

      def attribute_field(dashboard, resource, attribute_name, page)
        field = dashboard.attribute_type_for(attribute_name)
        value = resource.get_attribute_value(attribute_name, field)
        field.new(attribute_name, value, page)
      end

      attr_reader :dashboard, :options
    end
  end
end
