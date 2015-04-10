require_relative "base_presenter"

class IndexPresenter < BasePresenter
  include ActionView::Helpers::UrlHelper

  def initialize(dashboard)
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
    if attribute_name == dashboard.title_attribute
      link_to attribute_html(resource, attribute_name), show_path(resource)
    else
      attribute_html(resource, attribute_name)
    end
  end

  protected

  attr_reader :dashboard

  def attribute_html(resource, attribute_name)
    adapter(dashboard, resource, attribute_name).render_index
  end

  def show_path(resource)
    route(nil, resource_name, resource)
  end
end
