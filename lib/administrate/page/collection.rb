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

      def scope_groups
        if dashboard.collection_scopes.is_a?(Hash)
          dashboard.collection_scopes.keys
        else
          dashboard.collection_scopes.any? ? [:scopes] : []
        end
      end

      def scope_names(group = nil)
        if dashboard.collection_scopes.is_a?(Hash)
          group ||= dashboard.collection_scopes.keys.first
          dashboard.collection_scopes[group].map &:to_s
        else
          dashboard.collection_scopes.map &:to_s
        end.reject do |scope|
          # do NOT show the wildcarded scopes
          scope[-2..-1] == ":*"
        end
      end

      def search
        @options[:search]
      end

      def scoped_with?(scope)
        search.term.include? "scope:#{scope}"
      end

      # #scope_group(scope) receives an scope declared in the dashboard's
      # collection_scopes and returns the group of the array in which is found.
      def scope_group(scope)
        scope_groups.detect do |group|
          scope_names(group).include?(scope.to_s)
        end
      end

      # #scoped_groups returns an array with the COLLECTION_SCOPES' keys (i.e.
      # group name) which array contains a scope that is used in the current
      # search.
      def scoped_groups
        search.scopes_with_arguments.map {|s| scope_group(s)}
      end

      # #current_scope_of(group) receives a key (*group*) of the
      # collection_scopes hash (i.e. COLLECTION_SCOPES) and returns the scope
      # used in the current search that is into its array, or nil if none.
      def current_scope_of(group)
        search.scopes_with_arguments.detect {|s| scope_group(s) == group}
      end

      # #term_with_scope(scope) receives an scope and adds it to the current
      # search avoiding duplication and collision with another scope of the
      # same group (assuming that together will give no results).
      def term_with_scope(scope)
        if scoped_with?(scope)
          search.term
        else
          group = scope_group(scope)
          if scoped_groups.include? group
            search.term.sub "scope:#{current_scope_of(group)}", "scope:#{scope}"
          else
            "#{search.term} scope:#{scope}".strip
          end
        end
      end

      # #term_without_scope(scope) removes the scope from the search term if
      # the scope is defined in the Dashboard.
      def term_without_scope(scope)
        if search.scopes.include? scope
          search.term.sub("scope:#{scope}", "").strip
        else
          search.term
        end
      end

      delegate :ordered_by?, :order_params_for, to: :order

      private

      def order
        options[:order] || Order.new
      end
    end
  end
end
