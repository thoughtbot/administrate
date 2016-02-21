require "rails/generators/base"
require "administrate/generator_helpers"
require "administrate/namespace"

module Administrate
  module Generators
    class InstallGenerator < Rails::Generators::Base
      include Administrate::GeneratorHelpers
      source_root File.expand_path("../templates", __FILE__)

      def run_routes_generator
        if dashboard_resources.none?
          call_generator("administrate:routes")
          load Rails.root.join("config/routes.rb")
        end
      end

      def create_dashboard_controller
        copy_file(
          "application_controller.rb",
          "app/controllers/admin/application_controller.rb"
        )
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
        Administrate::Namespace.new(:admin).resources
      end
    end
  end
end
