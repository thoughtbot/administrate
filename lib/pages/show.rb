require_relative "base"

module Page
  class Show < Page::Base
    def initialize(dashboard, resource)
      @dashboard = dashboard
      @resource = resource
    end

    attr_reader :resource

    def page_title
      resource.to_s
    end

    def attributes
      dashboard.show_page_attributes.map do |attr_name|
        attribute_field(dashboard, resource, attr_name, :show)
      end
    end

    protected

    attr_reader :dashboard
  end
end
