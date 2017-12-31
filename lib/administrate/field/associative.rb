require_relative "base"

module Administrate
  module Field
    class Associative < Base
      def display_associated_resource
        associated_dashboard.display_resource(data)
      end

      protected

      def associated_dashboard
        dashboard_class_name.constantize.new
      end

      def associated_class
        associated_class_name.constantize
      end

      def dashboard_class_name
        options.fetch(:dashboard_class_name, "#{associated_class_name}Dashboard")
      end

      def associated_class_name
        options.fetch(:class_name, attribute.to_s.singularize.camelcase)
      end

      def primary_key
        options.fetch(:primary_key, :id)
      end

      def foreign_key
        options.fetch(:foreign_key, :"#{attribute}_id")
      end
    end
  end
end
