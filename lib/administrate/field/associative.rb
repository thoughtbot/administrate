require_relative "base"

module Administrate
  module Field
    class Associative < Base
      def display_associated_resource
        associated_dashboard.display_resource(data)
      end

      protected

      def candidate_resources
        return associated_class.public_send(options[:scope], data) if options[:scope]
        associated_class.all
      end

      def associated_dashboard
        "#{associated_class_name}Dashboard".constantize.new
      end

      def associated_class
        associated_class_name.constantize
      end

      def associated_class_name
        options.fetch(:class_name, attribute.to_s.singularize.camelcase)
      end
    end
  end
end
