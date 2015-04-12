require_relative "base_adapter"
require "action_controller/base"

class BelongsToAdapter < BaseAdapter
  include Rails.application.routes.url_helpers

  def render_show
    ActionController::Base.helpers.link_to data.to_s, url_to_data
  end

  def render_index
    render_show
  end

  def render_form_field(form, attribute)
    options = attribute_class(attribute).all.map do |option|
      [option.to_s, option.id]
    end

    form.select("#{attribute}_id", options)
  end

  def render_form_label(form, attribute)
    form.label "#{attribute}_id"
  end

  def self.permitted_attribute(attr)
    :"#{attr}_id"
  end

  private

  def attribute_class(attribute)
    Object.const_get(attribute.to_s.camelcase)
  end

  def url_to_data
    Rails.application.routes.url_helpers.public_send(data_path_helper, data)
  end

  def data_path_helper
    "#{data.class.to_s.underscore}_path"
  end
end
