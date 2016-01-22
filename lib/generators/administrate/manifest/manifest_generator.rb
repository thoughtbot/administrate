Rails.application.eager_load!
require "rails/generators/base"

module Administrate
  module Generators
    class ManifestGenerator < Rails::Generators::Base
      source_root File.expand_path("../templates", __FILE__)

      def create_dashboard_manifest
        template(
          "dashboard_manifest.rb.erb",
          Rails.root.join("app/dashboards/dashboard_manifest.rb"),
        )
      end

      def warn_about_invalid_models
        namespaced_models.each do |invalid_model|
          puts "WARNING: Unable to generate a dashboard for #{invalid_model}."
          puts "         Administrate does not yet support namespaced models."
        end

        models_without_tables.each do |invalid_model|
          puts "WARNING: Unable to generate a dashboard for #{invalid_model}."
          puts "         It is not connected to a database table."
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

      def valid_dashboard_models
        database_models - invalid_database_models
      end

      def database_models
        ActiveRecord::Base.descendants
      end

      def invalid_database_models
        models_without_tables + namespaced_models + unnamed_constants
      end

      def models_without_tables
        database_models.reject(&:table_exists?)
      end

      def namespaced_models
        database_models.select { |model| model.to_s.include?("::") }
      end

      def unnamed_constants
        ActiveRecord::Base.descendants.reject { |d| d.name == d.to_s }
      end
    end
  end
end
