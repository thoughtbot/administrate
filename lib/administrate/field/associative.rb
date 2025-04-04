require_relative "base"

module Administrate
  module Field
    class Associative < Base
      def self.foreign_key_for(resource_class, attr)
        reflection(resource_class, attr).foreign_key
      end

      def self.association_primary_key_for(resource_class, attr)
        reflection(resource_class, attr).association_primary_key
      end

      def self.associated_class(resource_class, attr)
        reflection(resource_class, attr).klass
      end

      def self.associated_class_name(resource_class, attr)
        associated_class(resource_class, attr).name
      end

      def self.reflection(resource_class, attr)
        resource_class.reflect_on_association(attr)
      end

      def display_associated_resource
        associated_dashboard.display_resource(data)
      end

      def associated_class
        if option_given?(:class_name)
          associated_class_name.constantize
        else
          self.class.associated_class(resource.class, attribute)
        end
      end

      def associated_class_name
        if option_given?(:class_name)
          options.fetch(:class_name)
        else
          self.class.associated_class_name(
            resource.class,
            attribute
          )
        end
      end

      def html_controller
        "select"
      end

      private

      def associated_dashboard
        "#{associated_class_name}Dashboard".constantize.new
      end

      def association_primary_key
        self.class.association_primary_key_for(resource.class, attribute)
      end

      def foreign_key
        self.class.foreign_key_for(resource.class, attribute)
      end

      def option_given?(name)
        options.key?(name)
      end
    end
  end
end
