require_relative "base"

module Page
  class Show < Page::Base
    def initialize(dashboard, resource)
      @dashboard = dashboard
      @resource = resource
    end

    def page_title
      resource.to_s
    end

    def attributes
      dashboard.show_page_attributes.map do |attr_name|
        attribute_field(dashboard, resource, attr_name, :show)
      end
    end

    def edit_path
      route(:edit, resource_name, resource)
    end

    protected

    attr_reader :dashboard, :resource
  end
end
