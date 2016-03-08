module Administrate
  class Namespace
    def initialize(namespace)
      @namespace = namespace
    end

    def resources
      whitelisted_controller_paths.map do |controller|
        controller.gsub(/^#{namespace}\//, "").to_sym
      end
    end

    private

    attr_reader :namespace

    def whitelisted_controller_paths
      if dashboard_manifest_missing?
        return namespace_controller_paths.uniq
      end

      namespace_controller_paths.uniq.select do |path|
        dashboard_paths.include? path
      end
    end

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

    def dashboard_paths
      @dashboard_paths ||= DashboardManifest::DASHBOARDS.map do |dashboard|
        "admin/#{dashboard}"
      end
    end

    def dashboard_manifest_missing?
      !Object.constants.include?(:DashboardManifest)
    end
  end
end
