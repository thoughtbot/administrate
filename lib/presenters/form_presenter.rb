require_relative "base_presenter"

class FormPresenter < BasePresenter
  def initialize(dashboard, resource)
    @dashboard = dashboard
    @resource = resource
  end

  attr_reader :resource

  def attributes
    dashboard.form_attributes.map do |attribute|
      adapter(dashboard, resource, attribute, :form)
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
