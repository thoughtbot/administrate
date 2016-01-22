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

      # #scope_groups adds the concept of "group of scopes" that let us manage
      # them always in groups based on the content of COLLECTION_SCOPES:
      #  - if it's empty it returns an empty array indicating no groups
      #  - if it's an array it returns an array w/ one group called :scopes
      #  - if it's a hash it returns its keys
      def scope_groups
        if dashboard.collection_scopes.is_a?(Hash)
          dashboard.collection_scopes.keys
        else
          dashboard.collection_scopes.any? ? [:scopes] : []
        end
      end

      # #scope_names returns an array with the names of the valid scopes that
      # can be searched in the Dashboard's index page to filter its results:
      # - If COLLECTION_SCOPES is a hash **the group parameter is required** and
      # the array of scopes with that key will be returned (NOTICE that **the
      # first key** of the hash will be used **if no group is sent**).
      # - If COLLECTION_SCOPES is an array it'll be returned ignoring the group
      # sent (for those scenarios the *group* param does't need to be sent).
      def scope_names(group = nil)
        if dashboard.collection_scopes.is_a?(Hash)
          group ||= dashboard.collection_scopes.keys.first
          dashboard.collection_scopes[group]
        else
          dashboard.collection_scopes
        end
      end

      def search
        @options[:search]
      end

      def scoped_with?(scope)
        search.term.include? scope.to_s
      end

      delegate :ordered_by?, :order_params_for, to: :order

      private

      def order
        options[:order] || Order.new
      end
    end
  end
end
