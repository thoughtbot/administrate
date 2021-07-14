require_relative "base"

module Administrate
  module Page
    class Collection < Page::Base
      def attribute_names
        dashboard.collection_attributes
      end
      
      def attribute_names_append(cols)
        allowed_values = dashboard.attribute_types.keys
        allowed_cols = (cols & allowed_values)
        final_cols =  dashboard.collection_attributes | allowed_cols
        dashboard.collection_attributes.replace final_cols
      end
      
      def attributes_for(resource)
        attribute_names.map do |attr_name|
          attribute_field(dashboard, resource, attr_name, :index)
        end
      end

      def attribute_types
        dashboard.attribute_types_for(attribute_names)
      end

      def ordered_html_class(attr)
        ordered_by?(attr) && order.direction
      end

      delegate :ordered_by?, to: :order

      def order_params_for(attr, key: resource_name)
        { key => order.order_params_for(attr) }
      end

      private

      def order
        options[:order] || Order.new
      end
    end
  end
end
