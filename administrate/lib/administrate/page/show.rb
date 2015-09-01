require_relative "base"

module Administrate
  module Page
    class Show < Page::Base
      include Administrate::ApplicationHelper

      def initialize(dashboard, resource)
        super(dashboard)
        @resource = resource
      end

      attr_reader :resource

      def page_title
        display_resource(resource)
      end

      def attributes
        dashboard.show_page_attributes.map do |attr_name|
          attribute_field(dashboard, resource, attr_name, :show)
        end
      end
    end
  end
end
