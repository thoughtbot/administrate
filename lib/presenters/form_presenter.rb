require_relative "base_presenter"

class FormPresenter < BasePresenter
  def initialize(dashboard, resource)
    @dashboard = dashboard
    @resource = resource
  end

  attr_reader :resource

  def attribute_names
    dashboard.form_attributes
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
