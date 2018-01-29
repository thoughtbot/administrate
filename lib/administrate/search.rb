require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"

module Administrate
  class Search
    def initialize(scoped_resource, dashboard_class, term)
      @dashboard_class = dashboard_class
      @scoped_resource = scoped_resource
      @term = term || ""
    end

    def run
      if @term.blank?
        @scoped_resource.all
      else
        queries, search_terms = query.transpose
        @scoped_resource.where(queries.join(" OR "), *search_terms)
      end
    end

    def available?
      query.present?
    end

    private

    def query
      @query ||= attribute_types.keys.map do |attr|
        table_name = ActiveRecord::Base.connection.
          quote_table_name(@scoped_resource.table_name)
        attr_name = ActiveRecord::Base.connection.quote_column_name(attr)

        attribute_types[attr].search_query("#{table_name}.#{attr_name}", term)
      end.compact
    end

    def attribute_types
      @dashboard_class::ATTRIBUTE_TYPES
    end

    attr_reader :term
  end
end
