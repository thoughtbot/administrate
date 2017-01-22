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
      self.class::ATTRIBUTE_TYPES.stringify_keys
    end

    def attribute_type_for(attribute_name)
      attribute_types.fetch(attribute_name.to_s) do
        fail attribute_not_found_message(attribute_name.to_s)
      end
    end

    def attribute_types_for(attribute_names)
      attribute_names.each_with_object({}) do |name, attributes|
        attributes[name.to_s] = attribute_type_for(name)
      end
    end

    def form_attributes
      self.class::FORM_ATTRIBUTES.map(&:to_s)
    end

    def permitted_attributes
      form_attributes.map do |attr|
        attribute_types[attr].permitted_attribute(attr)
      end.uniq
    end

    def show_page_attributes
      self.class::SHOW_PAGE_ATTRIBUTES.map(&:to_s)
    end

    def collection_attributes
      self.class::COLLECTION_ATTRIBUTES.map(&:to_s)
    end

    def display_resource(resource)
      "#{resource.class} ##{resource.id}"
    end

    private

    def attribute_not_found_message(attr)
      "Attribute #{attr} could not be found in #{self.class}::ATTRIBUTE_TYPES"
    end
  end
end
