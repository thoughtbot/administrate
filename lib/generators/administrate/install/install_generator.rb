require "rails/generators/base"
require "administrate/generator_helpers"

module Administrate
  module Generators
    class InstallGenerator < Rails::Generators::Base
      include Administrate::GeneratorHelpers
      source_root File.expand_path("../templates", __FILE__)

      def create_dashboard_controller
        copy_file(
          "application_controller.rb",
          "app/controllers/admin/application_controller.rb"
        )
      end

      def insert_dashboard_routes
        unless File.read(rails_routes_file_path).include?(dashboard_routes)
          route(dashboard_routes)
        end
      end

      def run_dashboard_generators
        singular_dashboard_resources.each do |resource|
          call_generator("administrate:dashboard", resource)
        end
      end

      private

      def singular_dashboard_resources
        dashboard_resources.map(&:to_s).map(&:singularize)
      end

      def dashboard_resources
        manifest::DASHBOARDS
      end

      def manifest
        unless defined?(DashboardManifest)
          call_generator("administrate:manifest")
        end

        DashboardManifest
      end

      def dashboard_routes
        File.read(routes_file_path)
      end

      def rails_routes_file_path
        Rails.root.join("config/routes.rb")
      end

      def routes_file_path
        File.expand_path(find_in_source_paths("routes.rb"))
      end
    end
  end
end
