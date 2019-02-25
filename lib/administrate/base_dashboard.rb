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
require "administrate/field/time"
require "administrate/field/url"
require "administrate/field/password"

module Administrate
  class BaseDashboard
    include Administrate

    DASHBOARD_SUFFIX = "Dashboard".freeze

    class << self
      def model
        to_s.chomp(DASHBOARD_SUFFIX).classify.constantize
      end

      def resource_name(opts)
        model.model_name.human(opts)
      end
    end

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

    def all_attributes
      attribute_types.keys
    end

    def form_attributes
      self.class::FORM_ATTRIBUTES
    end

    def permitted_attributes
      form_attributes.map do |attr|
        attribute_types[attr].permitted_attribute(attr)
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

    def collection_includes
      attribute_includes(collection_attributes)
    end

    def item_includes
      attribute_includes(show_page_attributes)
    end

    private

    def attribute_not_found_message(attr)
      "Attribute #{attr} could not be found in #{self.class}::ATTRIBUTE_TYPES"
    end

    def association_classes
      @association_classes ||=
        ObjectSpace.each_object(Class).
          select { |klass| klass < Administrate::Field::Associative }
    end

    def attribute_includes(attributes)
      attributes.map do |key|
        field = self.class::ATTRIBUTE_TYPES[key]

        next key if association_classes.include?(field)

        key if association_classes.include?(field.try(:deferred_class))
      end.compact
    end
  end
end
