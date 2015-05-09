require_relative "base"

module Page
  class Form < Page::Base
    def initialize(dashboard, resource)
      @dashboard = dashboard
      @resource = resource
    end

    attr_reader :resource

    def attributes
      dashboard.form_attributes.map do |attribute|
        attribute_field(dashboard, resource, attribute, :form)
      end
    end

    def page_title
      resource.to_s
    end

    def index_path
      route(nil, resource_name.pluralize)
    end

    protected

    attr_reader :dashboard
  end
end
