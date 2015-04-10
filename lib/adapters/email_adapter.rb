require "action_controller/base"

class EmailAdapter
  def initialize(data)
    @data = data
  end

  def render_index
    data
  end

  def render_show
    ActionController::Base.helpers.mail_to(data)
  end

  def render_edit(form, attribute_name)
    form.text_field(attribute_name)
  end

  attr_reader :data
end
