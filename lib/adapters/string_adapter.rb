require_relative "base_adapter"

class StringAdapter < BaseAdapter
  def adapter_name
    :string
  end
end
