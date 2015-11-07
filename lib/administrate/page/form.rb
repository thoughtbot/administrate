require_relative "base"

module Administrate
  module Page
    class Form < Page::Base
      def initialize(dashboard, resource)
        super(dashboard)
        @resource = resource
      end

      attr_reader :resource

      def attributes
        dashboard.form_attributes.map do |attribute|
          attribute_field(dashboard, resource, attribute, :form)
        end
      end

      def page_title
        dashboard.display_resource(resource)
      end

      protected

      attr_reader :dashboard
    end
  end
end
