if defined?(Zeitwerk)
  Zeitwerk::Loader.eager_load_all
else
  Rails.application.eager_load!
end

require "rails/generators/base"
require "administrate/generator_helpers"
require "administrate/constants"
require "administrate/namespace"

module Administrate
  module Generators
    class RoutesGenerator < Rails::Generators::Base
      DEFAULT_INDENT = 2
      ONE_INDENT = 1
      TWO_INDENT = 2
      include Administrate::GeneratorHelpers
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

      def valid_dashboard_models
        database_models - invalid_dashboard_models
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

      def generate_resource_routes(resource)
        if resource.include?("/")
          parts = resource.split("/")
          generate_nested_resource_routes(parts)
        else
          "resources :#{resource}"
        end
      end

      def generate_nested_resource_routes(items, index = 0)
        if index == items.size - 1
          "resources :#{items[index]}"
        else
          resource_indent = " " * ((index + TWO_INDENT) * DEFAULT_INDENT)
          resource = generate_nested_resource_routes(items, index + 1)
          indent_resource =  "#{resource_indent}#{resource}"
          indent_end = " " * ((index + ONE_INDENT) * DEFAULT_INDENT) + "end"
          "namespace :#{items[index]} do\n#{indent_resource}\n#{indent_end}"
        end
      end

      def unnamed_constants
        ActiveRecord::Base.descendants.reject { |d| d.name == d.to_s }
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
