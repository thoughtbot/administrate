require_relative "base"

module Administrate
  module Page
    class Collection < Page::Base
      def attribute_names
        dashboard.collection_attributes
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

      delegate :ordered_by?, :order_params_for, to: :order

      private

      def order
        options[:order] || Order.new
      end
    end
  end
end
