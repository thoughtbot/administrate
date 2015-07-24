require "rails/generators/named_base"

module Administrate
  module Generators
    class DashboardGenerator < Rails::Generators::NamedBase
      TABLE_ATTRIBUTE_LIMIT = 4

      source_root File.expand_path("../templates", __FILE__)

      def create_dashboard_definition
        template "dashboard.rb.erb", "app/dashboards/#{file_name}_dashboard.rb"
      end

      def create_resource_controller
        template(
          "controller.rb.erb",
          "app/controllers/admin/#{file_name.pluralize}_controller.rb"
        )
      end

      private

      def attributes
        klass.attribute_names + klass.reflections.keys
      end

      def field_type(attribute)
        klass.type_for_attribute(attribute).type ||
          association_type(attribute)
      end

      def association_type(attribute)
        reflection = klass.reflections[attribute.to_s]
        if reflection.collection?
          :has_many
        else
          :belongs_to
        end
      end

      def klass
        @klass ||= Object.const_get(class_name)
      end
    end
  end
end
