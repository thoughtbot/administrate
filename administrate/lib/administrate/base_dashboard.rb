require "administrate/fields/belongs_to"
require "administrate/fields/email"
require "administrate/fields/has_many"
require "administrate/fields/image"
require "administrate/fields/string"

module Administrate
  class BaseDashboard
    include Administrate

    def permitted_attributes
      form_attributes.map do |attr|
        attribute_types[attr].permitted_attribute(attr)
      end.uniq
    end
  end
end
