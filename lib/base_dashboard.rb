require "fields/belongs_to"
require "fields/email"
require "fields/image"
require "fields/string"

class BaseDashboard
  def permitted_attributes
    form_attributes.map do |attr|
      field_class(attr).permitted_attribute(attr)
    end.uniq
  end

  def field_class(attr)
    field_registry.fetch(attribute_types[attr])
  end

  private

  def field_registry
    {
      belongs_to: Field::BelongsTo,
      email: Field::Email,
      image: Field::Image,
      string: Field::String,
    }
  end
end
