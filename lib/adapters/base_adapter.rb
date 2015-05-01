require "action_controller/base"

class BaseAdapter < ActionController::Base
  self.view_paths = "lib/adapters/views/base"

  def initialize(data, request)
    # TODO I'd like a more robust solution than this,
    # with support for arbitrarily-inherited attribute adapters
    self.prepend_view_path("lib/adapters/views/#{adapter_view_path}")
    @data = data
    @request = request
  end

  def render_show
    template("show")
  end

  def render_index
    template("index")
  end

  def render_form_field(form, attribute)
    @form = form
    @attribute = attribute
    template("form_field")
  end

  def render_form_label(form, attribute)
    @form = form
    @attribute = attribute
    template("form_label")
  end

  def self.permitted_attribute(attr)
    attr
  end

  protected

  attr_reader :data, :request

  def template(template, options = {})
    render_to_string(
      options.merge(template: template)
    ).strip.html_safe
  end

  def adapter_view_path
    self.class.to_s.sub(/Adapter$/, "").underscore
  end
end
