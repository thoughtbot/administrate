require_relative "base"
require "pages/table"

module Field
  class HasMany < Field::Base
    def associated_table
      Page::Table.new(associated_dashboard)
    end

    private

    def associated_dashboard
      Object.const_get("#{resource_class_name}Dashboard").new
    end

    def resource_class_name
      attribute.to_s.singularize.camelcase
    end
  end
end
