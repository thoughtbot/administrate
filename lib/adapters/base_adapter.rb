class BaseAdapter
  def initialize(attribute, data, page)
    @attribute = attribute
    @data = data
    @page = page
  end

  def self.permitted_attribute(attr)
    attr
  end

  def name
    attribute.to_s
  end

  def to_partial_path
    "/adapters/#{page}/#{adapter_name}"
  end

  attr_reader :attribute, :data, :page
end
