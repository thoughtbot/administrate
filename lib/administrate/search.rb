require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"

module Administrate
  class Search
    def initialize(scoped_resource, dashboard_class, term)
      @dashboard_class = dashboard_class
      @scoped_resource = scoped_resource
      @term = term
    end

    def run
      if @term.blank?
        @scoped_resource.all
      else
        @scoped_resource.joins(tables_to_join).where(query, *search_terms)
      end
    end

    private

    def query
      search_attributes.map do |attr|
        table_name = query_table_name(attr)
        attr_name = column_to_query(attr)

        "LOWER(CAST(#{table_name}.#{attr_name} AS CHAR(256))) LIKE ?"
      end.join(" OR ")
    end

    def search_terms
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

    def query_table_name(attr)
      if association_search?(attr)
        ActiveRecord::Base.connection.quote_table_name(attr.to_s.pluralize)
      else
        ActiveRecord::Base.connection.
          quote_table_name(@scoped_resource.table_name)
      end
    end

    def column_to_query(attr)
      if association_search?(attr)
        ActiveRecord::Base.connection.
          quote_column_name(attribute_types[attr].searchable_field)
      else
        ActiveRecord::Base.connection.quote_column_name(attr)
      end
    end

    def tables_to_join
      attribute_types.keys.select do |attribute|
        attribute_types[attribute].searchable? && association_search?(attribute)
      end
    end

    def association_search?(attribute)
      return unless attribute_types[attribute].respond_to?(:deferred_class)

      [
        Administrate::Field::BelongsTo,
        Administrate::Field::HasMany,
        Administrate::Field::HasOne,
      ].include?(attribute_types[attribute].deferred_class)
    end

    attr_reader :resolver, :term
  end
end
