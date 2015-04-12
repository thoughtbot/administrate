require "action_controller/base"
require_relative "base_adapter"

class EmailAdapter < BaseAdapter
  def render_show
    ActionController::Base.helpers.mail_to(data)
  end
end
