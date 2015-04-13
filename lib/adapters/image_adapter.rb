require_relative "./base_adapter"

class ImageAdapter < BaseAdapter
  def render_index
    render_show
  end

  def render_show
    ActionController::Base.helpers.image_tag(data)
  end
end
