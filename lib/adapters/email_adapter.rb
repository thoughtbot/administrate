require "action_controller/base"
require_relative "base_adapter"

class EmailAdapter < BaseAdapter
  def adapter_name
    :email
  end
end
