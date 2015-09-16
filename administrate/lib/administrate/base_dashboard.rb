require "administrate/fields/belongs_to"
require "administrate/fields/boolean"
require "administrate/fields/date_time"
require "administrate/fields/email"
require "administrate/fields/has_many"
require "administrate/fields/has_one"
require "administrate/fields/image"
require "administrate/fields/number"
require "administrate/fields/polymorphic"
require "administrate/fields/string"

module Administrate
  class BaseDashboard
    include Administrate

    def attribute_types
      self.class::ATTRIBUTE_TYPES
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

    def table_attributes
      self.class::TABLE_ATTRIBUTES
    end
  end
end
