require_relative "base_presenter"

class IndexPresenter < BasePresenter
  include ActionView::Helpers::UrlHelper

  def initialize(dashboard, request)
    super(request)
    @dashboard = dashboard
  end

  def attribute_names
    dashboard.index_page_attributes
  end

  def edit_path(resource)
    route(:edit, resource_name, resource)
  end

  def new_path
    route(:new, resource_name)
  end

  def render_attribute(resource, attribute_name)
    attribute_html(resource, attribute_name)
  end

  def show_path(resource)
    route(nil, resource_name, resource)
  end

  protected

  attr_reader :dashboard

  def attribute_html(resource, attribute_name)
    adapter(dashboard, resource, attribute_name).render_index
  end
end
