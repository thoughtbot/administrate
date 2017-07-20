require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"

module Administrate
  class Search
    class Query
      delegate :blank?, to: :terms

      def initialize(original_query)
        @original_query = original_query
      end

      def original
        @original_query
      end

      def terms
        original.to_s
      end

      def to_s
        original
      end
    end

    def initialize(scoped_resource, dashboard_class, term)
      @dashboard_class = dashboard_class
      @scoped_resource = scoped_resource
      @query = Query.new(term)
    end

    def run
      if query.blank?
        @scoped_resource.all
      else
        @scoped_resource.where(query_template, *query_values)
      end
    end

    private

    def query_template
      search_attributes.map do |attr|
        table_name = ActiveRecord::Base.connection.
          quote_table_name(@scoped_resource.table_name)
        attr_name = ActiveRecord::Base.connection.quote_column_name(attr)
        "lower(#{table_name}.#{attr_name}) LIKE ?"
      end.join(" OR ")
    end

    def query_values
      ["%#{term.mb_chars.downcase}%"] * search_attributes.count
    end

    def search_attributes
      attribute_types.keys.select do |attribute|
        attribute_types[attribute].searchable?
      end
    end

    def attribute_types
      @dashboard_class::ATTRIBUTE_TYPES
    end

    def term
      query.terms
    end

    attr_reader :resolver, :query
  end
end
