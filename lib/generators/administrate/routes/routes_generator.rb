if defined?(Zeitwerk)
  Zeitwerk::Loader.eager_load_all
else
  Rails.application.eager_load!
end

require "rails/generators/base"
require "administrate/generator_helpers"
require "administrate/namespace"

module Administrate
  module Generators
    class RoutesGenerator < Rails::Generators::Base
      include Administrate::GeneratorHelpers
      DEFAULT_INDENT = " " * 2
      INVALID_DATABASE_MODELS_LIST = [
        "ActiveRecord::SchemaMigration",
        "ActiveRecord::InternalMetadata",
        "primary::SchemaMigration",
      ]
      source_root File.expand_path("../templates", __FILE__)
      class_option :namespace, type: :string, default: "admin"

      def insert_dashboard_routes
        if valid_dashboard_models.any?
          route(dashboard_routes)
        end
      end

      def warn_about_invalid_models
        invalid_dashboard_models.each do |model|
          puts "WARNING: Unable to generate a dashboard for #{model}."
          if models_without_tables.include?(model)
            puts "       - It is not connected to a database table."
            puts "         Make sure your database migrations are up to date."
          end
        end

        unnamed_constants.each do |invalid_model|
          puts "NOTICE: Skipping dynamically generated model #{invalid_model}."
        end
      end

      private

      def namespace
        options[:namespace]
      end

      def dashboard_resources
        valid_dashboard_models.map do |model|
          model.to_s.pluralize.underscore
        end
      end

      def dashboard_resources_hash
        output = [{}, []]
        dashboard_resources.each do |resource_path| 
          split_path = resource_path.split('/')
          output = [
            add_namespace_to_hash(split_path, output[0]),
            add_resources_to_hash(split_path, output[1]),
          ]
        end
        output
      end

      def add_namespace_to_hash(split_path, current_state)
        if split_path.length > 1
          current_state[split_path[0]] ||= [{}, []]
          current_state[split_path[0]] = [
            add_namespace_to_hash(split_path[1..], current_state[split_path[0]][0]),
            add_resources_to_hash(split_path[1..], current_state[split_path[0]][1]),
          ]
        end
        current_state
      end

      def add_resources_to_hash(split_path, current_state)
        if split_path.length == 1
          current_state.push(split_path[0])
        end
        current_state
      end

      def valid_dashboard_models
        database_models - (invalid_dashboard_models + excluded_models).uniq
      end

      def database_models
        ActiveRecord::Base.descendants.reject(&:abstract_class?)
      end

      def invalid_dashboard_models
        (models_without_tables + unnamed_constants).uniq
      end

      def models_without_tables
        database_models.reject(&:table_exists?)
      end

      def excluded_models
        database_models.select do |model|
          INVALID_DATABASE_MODELS_LIST.include?(model.to_s)
        end
      end

      def unnamed_constants
        ActiveRecord::Base.descendants.reject { |d| d.name == d.to_s }
      end

      def generate_resource_routes(namespace)
        output_string = ""
        namespace[1].each do |resource|
          output_string += "#{DEFAULT_INDENT}resources :#{resource}\n"
        end
        output_string += "\n#{generate_namespace_routes(namespace[0])}"
        output_string
      end

      def generate_namespace_routes(hash, indent = 1)
        output_string = ""
        indentation = DEFAULT_INDENT * indent
        hash.each do |namespace, namespace_resource|
          nested_namespaces = namespace_resource[0]
          nested_resources = namespace_resource[1]
          output_string += "#{indentation}namespace :#{namespace} do\n"
          nested_resources.each do |resource|
            resource_string = "#{DEFAULT_INDENT}resources :#{resource}"
            output_string += "#{indentation}#{resource_string}\n"
          end
          if !nested_namespaces.empty?
            namespaces_string = generate_namespace_routes(nested_namespaces, indent + 1)
            output_string += "\n#{namespaces_string}\n"
          end
          output_string += "#{indentation}end\n"
        end
        output_string
      end 

      def dashboard_routes
        ERB.new(File.read(routes_file_path)).result(binding)
      end

      def routes_file_path
        File.expand_path(find_in_source_paths("routes.rb.erb"))
      end
    end
  end
end
