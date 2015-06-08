require "administrate/fields/belongs_to"
require "administrate/fields/email"
require "administrate/fields/has_many"
require "administrate/fields/image"
require "administrate/fields/string"

module Administrate
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
        belongs_to: Administrate::Field::BelongsTo,
        datetime: Administrate::Field::String,
        email: Administrate::Field::Email,
        float: Administrate::Field::String,
        has_many: Administrate::Field::HasMany,
        image: Administrate::Field::Image,
        integer: Administrate::Field::String,
        string: Administrate::Field::String,
        text: Administrate::Field::String,
      }
    end
  end
end
