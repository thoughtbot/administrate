class BaseAdapter
  def initialize(data)
    @data = data
  end

  def render_show
    data
  end

  def render_index
    data
  end

  def render_form_field(form, attribute)
    form.text_field(attribute)
  end

  def render_form_label(form, attribute)
    form.label attribute
  end

  def self.permitted_attribute(attr)
    attr
  end

  protected

  attr_reader :data
end
