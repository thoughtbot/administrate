require_relative "base"

module Page
  class Index < Page::Base
    def initialize(dashboard)
      @dashboard = dashboard
    end

    def attribute_names
      dashboard.index_page_attributes
    end

    def attributes_for(resource)
      attribute_names.map do |attr_name|
        attribute_field(dashboard, resource, attr_name, :index)
      end
    end

    def edit_path(resource)
      route(:edit, resource_name, resource)
    end

    def new_path
      route(:new, resource_name)
    end

    def show_path(resource)
      route(nil, resource_name, resource)
    end

    protected

    attr_reader :dashboard
  end
end
