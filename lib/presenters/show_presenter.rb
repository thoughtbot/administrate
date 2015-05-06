require_relative "base_presenter"

class ShowPresenter < BasePresenter
  def initialize(dashboard, resource, request)
    @dashboard = dashboard
    @resource = resource
    super(request)
  end

  def page_title
    resource.to_s
  end

  def attributes
    Hash[
      dashboard.show_page_attributes.map do |attr_name|
        [attr_name, render_attribute(attr_name)]
      end
    ]
  end

  def render_attribute(attribute_name)
    adapter(dashboard, resource, attribute_name).render_show
  end

  def edit_path
    route(:edit, resource_name, resource)
  end

  protected

  attr_reader :dashboard, :resource
end
