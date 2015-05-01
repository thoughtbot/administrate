require_relative "base_adapter"

class BelongsToAdapter < BaseAdapter
  def self.permitted_attribute(attr)
    :"#{attr}_id"
  end

  private

  helper_method :form_options
  def form_options(attribute)
    attribute_class(attribute).all.map do |option|
      [option.to_s, option.id]
    end
  end

  def attribute_class(attribute)
    Object.const_get(attribute.to_s.camelcase)
  end
end
