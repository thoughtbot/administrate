class IndexPresenter
  include ActionView::Helpers::UrlHelper

  def initialize(dashboard)
    @dashboard = dashboard
  end

  def attribute_names
    dashboard.index_attributes
  end

  def edit_path(resource)
    Rails.application.routes.url_helpers.send(
      "edit_#{resource_name}_path",
      resource,
    )
  end

  def new_path
    Rails.application.routes.url_helpers.send(
      "new_#{resource_name}_path"
    )
  end

  def render_attribute(resource, attribute_name)
    if attribute_name == dashboard.title_attribute
      link_to attribute_html(resource, attribute_name), show_path(resource)
    else
      attribute_html(resource, attribute_name)
    end
  end

  def resource_name
    @resource_name ||=
      dashboard.class.to_s.scan(/(.+)Dashboard/).first.first.downcase
  end

  protected

  attr_reader :dashboard

  def attribute_html(resource, attribute_name)
    resource.public_send(attribute_name)
  end

  def show_path(resource)
    Rails.application.routes.url_helpers.send(
      "#{resource_name}_path",
      resource,
    )
  end
end
