Rails.application.eager_load!
require "rails/generators/base"
require "administrate/namespace"

module Administrate
  module Generators
    class RoutesGenerator < Rails::Generators::Base
      source_root File.expand_path("../templates", __FILE__)

      def insert_dashboard_routes
        if should_route_dashboard?
          route(dashboard_routes)
        end
      end

      def warn_about_invalid_models
        deeply_namespaced_models.each do |invalid_model|
          puts "WARNING: Unable to generate a dashboard for #{invalid_model}."
          puts "         Administrate does not yet support more than one level of namespace for models."
        end

        models_without_tables.each do |invalid_model|
          puts "WARNING: Unable to generate a dashboard for #{invalid_model}."
          puts "         It is not connected to a database table."
          puts "         Make sure your database migrations are up to date."
        end

        unnamed_constants.each do |invalid_model|
          puts "NOTICE: Skipping dynamically generated model #{invalid_model}."
        end
      end

      private

      def dashboard_resources
        valid_dashboard_models.map do |model|
          model.to_s.pluralize.underscore
        end
      end

      def namespaced_dashboard_resources
        result_hash = Hash.new { |hash, key| hash[key] = [] }

        valid_namespaced_dashboard_models.reduce(result_hash) do |result, model|
          namespace, model_name = model.to_s.split('::')[0..1]
          result[namespace.underscore] << model_name.pluralize.underscore

          result
        end
      end

      def valid_dashboard_models
        database_models - invalid_database_models - namespaced_models
      end

      def valid_namespaced_dashboard_models
        namespaced_models - invalid_database_models
      end

      def database_models
        ActiveRecord::Base.descendants
      end

      def namespaced_models
        database_models.select { |model| model.to_s.split("::").size == 2 }
      end

      def deeply_namespaced_models
        database_models.select { |model| model.to_s.split("::").size > 2 }
      end

      def invalid_database_models
        models_without_tables + unnamed_constants + rails_internal_models + deeply_namespaced_models
      end

      def models_without_tables
        database_models.reject(&:table_exists?)
      end

      def unnamed_constants
        ActiveRecord::Base.descendants.reject { |d| d.name == d.to_s }
      end

      def rails_internal_models
        [ActiveRecord::SchemaMigration]
      end

      def dashboard_routes
        ERB.new(File.read(routes_file_path), nil, '-').result(binding)
      end

      def routes_includes_resources?
        File.read(rails_routes_file_path).include?(dashboard_routes)
      end

      def rails_routes_file_path
        Rails.root.join("config/routes.rb")
      end

      def routes_file_path
        File.expand_path(find_in_source_paths("routes.rb.erb"))
      end

      def should_route_dashboard?
        routes_includes_resources? || valid_dashboard_models.any?
      end
    end
  end
end
