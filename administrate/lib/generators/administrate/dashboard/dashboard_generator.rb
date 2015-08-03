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
        if klass.type_for_attribute(attribute).type
          default_field_type
        else
          association_type(attribute)
        end
      end

      def default_field_type
        "Field::String"
      end

      def association_type(attribute)
        reflection = klass.reflections[attribute.to_s]
        if reflection.collection?
          "Field::HasMany" + has_many_options_string(reflection)
        else
          "Field::BelongsTo"
        end
      end

      def klass
        @klass ||= Object.const_get(class_name)
      end

      def has_many_options_string(reflection)
        options = reflection.options.slice(*allowed_has_many_options)

        if options.any?
          ".with_options(#{hash_to_string(options)})"
        else
          ""
        end
      end

      def allowed_has_many_options
        [
          :class_name,
        ]
      end

      def hash_to_string(hash)
        hash.map { |key, value| "#{key}: #{value.inspect}" }.join(", ")
      end
    end
  end
end
