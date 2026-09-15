module Administrate
  module DashboardManager
    extend ActiveSupport::Concern

    included do
      delegate :dashboard_class, :resource_class, :resource_name, :namespace,
        to: :resource_resolver
      helper_method :namespace
      helper_method :resource_name
      helper_method :resource_class
    end

    private

    def dashboard
      @dashboard ||= dashboard_class.new.tap do |d|
        d.context = self
      end
    end

    def dashboard_attribute(attribute)
      dashboard.attribute_types[attribute.to_sym] if attribute
    end

    def resource_resolver
      @resource_resolver ||=
        Administrate::ResourceResolver.new(controller_path)
    end
  end
end
