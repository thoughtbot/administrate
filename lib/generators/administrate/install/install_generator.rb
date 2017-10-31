require "rails/generators/base"
require "administrate/generator_helpers"
require "administrate/namespace"

module Administrate
  module Generators
    class InstallGenerator < Rails::Generators::Base
      include Administrate::GeneratorHelpers
      source_root File.expand_path("../templates", __FILE__)

      class_option :module, type: :string,
                            default: "Admin",
                            desc: "Indicates the module name",
                            aliases: "-m"

      def run_routes_generator
        if dashboard_resources.none?
          call_generator("administrate:routes")
          load Rails.root.join("config/routes.rb")
        end
      end

      def create_dashboard_controller
        template(
          "application_controller.rb.erb",
          "app/controllers/#{module_name.underscore}/application_controller.rb",
        )
      end

      def run_dashboard_generators
        singular_dashboard_resources.each do |resource|
          call_generator("administrate:dashboard", resource)
        end
      end

      def module_name
        options["module"]
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
