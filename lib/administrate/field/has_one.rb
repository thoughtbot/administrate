require_relative "associative"

module Administrate
  module Field
    class HasOne < Associative
      def initialize(attribute, data, page, options = {})
        resolver = Administrate::ResourceResolver.new("admin/#{attribute}")
        @nested_form = Administrate::Page::Form.new(
          resolver.dashboard_class.new,
          data || resolver.resource_class.new,
        )

        super
      end

      def self.permitted_attribute(attr)
        related_dashboard_attributes =
          Administrate::ResourceResolver.new("admin/#{attr}").
            dashboard_class.new.permitted_attributes + [:id]

        { "#{attr}_attributes": related_dashboard_attributes }
      end

      attr_reader :nested_form
    end
  end
end
