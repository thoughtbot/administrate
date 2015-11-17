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
        value = get_attribute_value(resource, attribute_name)

        dashboard.
          attribute_types[attribute_name].
          new(attribute_name, value, page)
      rescue NoMethodError
        raise NoMethodError.new(error_message(attribute_name), :new)
      end

      def get_attribute_value(resource, attribute_name)
        resource.public_send(attribute_name)
      rescue NameError
        nil
      end

      attr_reader :dashboard, :options

      private

      def error_message(attribute_name)
        <<ERROR_MESSAGE
Attribute `:#{attribute_name}' not found in dashboard #{dashboard.class}.
Perhaps you misspelled it or it is missing in `#{dashboard.class}::ATTRIBUTE_TYPES'?
ERROR_MESSAGE
      end
    end
  end
end
