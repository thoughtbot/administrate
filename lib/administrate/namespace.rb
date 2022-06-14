module Administrate
  class Namespace
    def initialize(namespace)
      @namespace = namespace.to_sym
    end

    def resources
      @resources ||= routes.keys.map(&:first).uniq.map do |path|
        Resource.new(namespace, path)
      end
    end

    def routes
      @routes ||= all_routes.select do |controller, _action|
        controller.starts_with?("#{namespace}/")
      end.map do |controller, action, required_parts|
        [[controller.gsub(/^#{namespace}\//, ""), action], required_parts]
      end.to_h
    end

    def resources_with_index_route
      routes.select do |(_resource, route)|
        route == "index"
      end.keys.map(&:first).uniq
    end

    private

    attr_reader :namespace

    def all_routes
      Rails.application.routes.routes.map do |route|
        route.defaults.values_at(:controller, :action).map(&:to_s) +
          [route.required_parts.map(&:to_s)]
      end
    end
  end
end
