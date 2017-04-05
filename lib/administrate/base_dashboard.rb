require "administrate/field/belongs_to"
require "administrate/field/boolean"
require "administrate/field/date_time"
require "administrate/field/email"
require "administrate/field/has_many"
require "administrate/field/has_one"
require "administrate/field/number"
require "administrate/field/polymorphic"
require "administrate/field/select"
require "administrate/field/string"
require "administrate/field/text"

module Administrate
  class BaseDashboard
    include Administrate

    def attribute_types
      self.class::ATTRIBUTE_TYPES
    end

    def attribute_type_for(attribute_name)
      attribute_types.fetch(attribute_name) do
        fail attribute_not_found_message(attribute_name)
      end
    end

    def attribute_types_for(attribute_names)
      attribute_names.each_with_object({}) do |name, attributes|
        attributes[name] = attribute_type_for(name)
      end
    end

    def form_attributes
      self.class::FORM_ATTRIBUTES
    end

    def permitted_attributes
      form_attributes.map do |attr|
        attribute_type = attribute_types[attr]
        if attribute_type == Administrate::Field::HasOne
          { "#{attr}_attributes": has_one_attributes(attr) }
        else
          attribute_types[attr].permitted_attribute(attr)
        end
      end.uniq
    end

    def show_page_attributes
      self.class::SHOW_PAGE_ATTRIBUTES
    end

    def collection_attributes
      self.class::COLLECTION_ATTRIBUTES
    end

    def display_resource(resource)
      "#{resource.class} ##{resource.id}"
    end

    def association_includes
      association_classes = [Field::HasMany, Field::HasOne, Field::BelongsTo]

      collection_attributes.map do |key|
        field = self.class::ATTRIBUTE_TYPES[key]

        next key if association_classes.include?(field)
        key if association_classes.include?(field.try :deferred_class)
      end.compact
    end

    private

    def has_one_attributes(has_one_attr)
      Administrate::ResourceResolver.new("admin/#{has_one_attr}").
        dashboard_class.new.permitted_attributes + [:id]
    end

    def attribute_not_found_message(attr)
      "Attribute #{attr} could not be found in #{self.class}::ATTRIBUTE_TYPES"
    end
  end
end
