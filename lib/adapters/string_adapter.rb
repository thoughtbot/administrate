class StringAdapter
  def initialize(data)
    @data = data
  end

  def render_show
    data
  end

  def render_index
    data
  end

  def render_edit(form, attribute_name)
    form.text_field(attribute_name)
  end

  attr_reader :data
end
