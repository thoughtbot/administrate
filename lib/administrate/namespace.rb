module Administrate
  class Namespace
    Resource = Struct.new(:name, :path)

    def initialize(namespace)
      @namespace = namespace
    end

    def resources
      namespace_controller_paths.uniq.map do |controller|
        Resource.new(
          controller.gsub(/^#{namespace}\//, "").to_sym,
          controller.split('/').map(&:to_sym)
        )
      end
    end

    private

    attr_reader :namespace

    def namespace_controller_paths
      all_controller_paths.select do |controller|
        controller.starts_with?(namespace.to_s)
      end
    end

    def all_controller_paths
      Rails.application.routes.routes.map do |route|
        route.defaults[:controller].to_s
      end
    end
  end
end
