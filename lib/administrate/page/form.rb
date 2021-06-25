require_relative "base"

module Administrate
  module Page
    class Form < Page::Base
      def initialize(dashboard, resource)
        super(dashboard)
        @resource = resource
      end

      attr_reader :resource

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

      attr_reader :dashboard
    end
  end
end
