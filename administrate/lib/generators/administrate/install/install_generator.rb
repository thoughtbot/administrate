Rails.application.eager_load!
require "rails/generators/base"

module Administrate
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path("../templates", __FILE__)

      def create_dashboard_controller
        copy_file(
          "application_controller.rb",
          "app/controllers/admin/application_controller.rb"
        )
      end

      def create_dashboard_manifest
        template(
          "dashboard_manifest.rb.erb",
          "app/dashboards/dashboard_manifest.rb"
        )
      end

      def insert_dashboard_routes
        route(dashboard_routes)
      end

      def run_dashboard_generators
        singular_dashboard_resources.each do |resource|
          Rails::Generators.invoke("administrate:dashboard", [resource])
        end
      end

      private

      def singular_dashboard_resources
        dashboard_resources.map(&:singularize)
      end

      def dashboard_resources
        valid_dashboard_models.map do |model|
          model.to_s.pluralize.underscore
        end
      end

      def valid_dashboard_models
        database_models.reject { |model| model.to_s.include?("::") }
      end

      def database_models
        ActiveRecord::Base.descendants
      end

      def dashboard_routes
        File.read(routes_file_path)
      end

      def routes_file_path
        File.expand_path(find_in_source_paths("routes.rb"))
      end
    end
  end
end
