require_relative "base"

module Administrate
  module Page
    class Form < Page::Base
      def initialize(dashboard, resource)
        super(dashboard)
        @resource = resource
      end

      attr_reader :resource

      # RINSED made :dashboard public added attributes_for
      attr_reader :dashboard

      def attributes_for(action, attributes)
        (attributes & attributes(action).map(&:attribute)).map(&method(:attribute_for))
      end
      # RINSED END

      def attributes(action = nil)
        action =
          case action
          when "update" then "edit"
          when "create" then "new"
          else action
          end

        dashboard.form_attributes(action).map do |attribute|
          attribute_field(dashboard, resource, attribute, :form)
        end
      end

      def page_title
        dashboard.display_resource(resource)
      end

      private
      # RINSED made :dashboard public, added attributes_for

      def attribute_for(attribute)
        attribute_field(dashboard, resource, attribute, :form)
      end
      # RINSED END
    end
  end
end
