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
    class InstallGenerator < Rails::Generators::Base
      include Administrate::GeneratorHelpers
      source_root File.expand_path("../templates", __FILE__)

      class_option :namespace, type: :string, default: "admin"

      def model_check
        puts database_models, database_models.none?
        puts models_without_tables, "w/o"
        puts unnamed_constants, "unnamed"
        if database_models.none?
          raise Error, "Add models before installing Administrate."
        end
      end

      def run_routes_generator
        if dashboard_resources.none?
          call_generator("administrate:routes", "--namespace", namespace)
          load find_routes_file
        end
      end

      def create_dashboard_controller
        template(
          "application_controller.rb.erb",
          "app/controllers/#{namespace}/application_controller.rb",
        )
      end

      def run_dashboard_generators
        singular_dashboard_resources.each do |resource|
          call_generator "administrate:dashboard", resource,
            "--namespace", namespace
        end
      end
 
      private


      def namespace
        options[:namespace]
      end

      def singular_dashboard_resources
        dashboard_resources.map(&:to_s).map(&:singularize)
      end

      def dashboard_resources
        Administrate::Namespace.new(namespace).resources
      end

      def database_models
        ActiveRecord::Base.descendants.reject(&:abstract_class?)
      end

      def unnamed_constants
        ActiveRecord::Base.descendants.reject { |d| d.name == d.to_s }
      end

      def models_without_tables
        database_models.reject(&:table_exists?)
      end

    end
  end
end
