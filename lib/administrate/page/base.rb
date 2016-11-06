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
        normalized_attribute_name = attribute_name.to_s.split('/').last
        value = get_attribute_value(resource, normalized_attribute_name)
        field = dashboard.attribute_type_for(attribute_name)
        field.new(attribute_name, value, page)
      end

      def get_attribute_value(resource, attribute_name)
        resource.public_send(attribute_name)
      rescue NameError
        nil
      end

      attr_reader :dashboard, :options
    end
  end
end
