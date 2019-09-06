module Administrate
  class Namespace
    class Resource
      attr_reader :namespace, :resource

      delegate :display_in_navigation?, to: :dashboard_class
      delegate :dashboard_class, to: :resource_resolver

      def initialize(namespace, resource)
        @namespace = namespace
        @resource = resource
      end

      def to_s
        name.to_s
      end

      def to_sym
        name
      end

      def name
        resource.to_s.gsub(/^#{namespace}\//, "").to_sym
      end

      def path
        name.to_s.gsub("/", "_")
      end

      private

      def resource_resolver
        @resource_resolver ||= ResourceResolver.new("#{namespace}/#{resource}")
      end
    end
  end
end
