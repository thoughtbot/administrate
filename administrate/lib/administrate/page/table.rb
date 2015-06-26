require_relative "base"

module Administrate
  module Page
    class Table < Page::Base
      def attribute_names
        dashboard.table_attributes
      end

      def attributes_for(resource)
        attribute_names.map do |attr_name|
          attribute_field(dashboard, resource, attr_name, :index)
        end
      end

      def to_partial_path
        "/dashboard/table"
      end
    end
  end
end
