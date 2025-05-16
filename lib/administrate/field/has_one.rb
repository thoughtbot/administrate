require_relative "associative"

module Administrate
  module Field
    class HasOne < Associative
      def self.permitted_attribute(attr, options = {})
        resource_class = options[:resource_class]
        final_associated_class_name =
          if options.key?(:class_name)
            options.fetch(:class_name)
          else
            associated_class_name(resource_class, attr)
          end
        related_dashboard_attributes =
          Administrate::ResourceResolver
            .new("admin/#{final_associated_class_name}")
            .dashboard_class.new.permitted_attributes + [:id]
        {"#{attr}_attributes": related_dashboard_attributes}
      end

      def self.eager_load?
        true
      end

      def nested_form
        @nested_form ||= Administrate::Page::Form.new(
          resolver.dashboard_class.new,
          data || resolver.resource_class.new
        )
      end

      def nested_show
        @nested_show ||= Administrate::Page::Show.new(
          resolver.dashboard_class.new,
          data || resolver.resource_class.new
        )
      end

      def linkable?
        data.try(:persisted?)
      end

      def html_controller
        "select"
      end

      private

      def resolver
        @resolver ||=
          Administrate::ResourceResolver.new("admin/#{associated_class.name}")
      end
    end
  end
end
