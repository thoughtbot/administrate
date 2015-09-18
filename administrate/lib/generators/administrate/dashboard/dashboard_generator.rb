require "rails/generators/named_base"

module Administrate
  module Generators
    class DashboardGenerator < Rails::Generators::NamedBase
      ATTRIBUTE_TYPE_MAPPING = {
        boolean: "Field::Boolean",
        date: "Field::DateTime",
        datetime: "Field::DateTime",
        float: "Field::Number",
        integer: "Field::Number",
        time: "Field::DateTime",
      }

      ATTRIBUTE_OPTIONS_MAPPING = {
        float: { decimals: 2 },
      }

      DEFAULT_FIELD_TYPE = "Field::String"
      TABLE_ATTRIBUTE_LIMIT = 4

      source_root File.expand_path("../templates", __FILE__)

      def create_dashboard_definition
        template "dashboard.rb.erb", "app/dashboards/#{file_name}_dashboard.rb"
      end

      def create_resource_controller
        template(
          "controller.rb.erb",
          "app/controllers/admin/#{file_name.pluralize}_controller.rb",
        )
      end

      private

      def attributes
        klass.reflections.keys + klass.attribute_names - redundant_attributes
      end

      def redundant_attributes
        klass.reflections.keys.flat_map do |relationship|
          redundant_attributes_for(relationship)
        end.compact
      end

      def redundant_attributes_for(relationship)
        case association_type(relationship)
        when "Field::Polymorphic"
          [relationship + "_id", relationship + "_type"]
        when "Field::BelongsTo"
          relationship + "_id"
        end
      end

      def field_type(attribute)
        type = klass.column_types[attribute.to_s].type

        if type
          ATTRIBUTE_TYPE_MAPPING.fetch(type, DEFAULT_FIELD_TYPE) +
            options_string(ATTRIBUTE_OPTIONS_MAPPING.fetch(type, {}))
        else
          association_type(attribute)
        end
      end

      def association_type(attribute)
        relationship = klass.reflections[attribute.to_s]
        if relationship.has_one?
          "Field::HasOne"
        elsif relationship.collection?
          "Field::HasMany" + relationship_options_string(relationship)
        elsif relationship.polymorphic?
          "Field::Polymorphic"
        else
          "Field::BelongsTo" + relationship_options_string(relationship)
        end
      end

      def klass
        @klass ||= Object.const_get(class_name)
      end

      def relationship_options_string(relationship)
        if relationship.class_name != relationship.name.to_s.classify
          options_string(class_name: relationship.class_name)
        else
          ""
        end
      end

      def options_string(options)
        if options.any?
          ".with_options(#{inspect_hash_as_ruby(options)})"
        else
          ""
        end
      end

      def inspect_hash_as_ruby(hash)
        hash.map { |key, value| "#{key}: #{value.inspect}" }.join(", ")
      end
    end
  end
end
