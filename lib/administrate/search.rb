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
        puts search_terms
        puts search_terms.count
        @scoped_resource.joins(tables_to_join).where(query, *search_terms)
      end
    end

    private

    def query
      res = []
      search_attributes.map do |attr|
        table_name = query_table_name(attr)
        attr_name = column_to_query(attr)
        if attr_name.is_a?(String)
          arr = attr_name.split
        end
        if attr_name.is_a?(Array)
          arr = attr_name
        end
        arr.each do |elem|
          res.push "LOWER(CAST(#{table_name}.#{elem} AS CHAR(256))) LIKE ?"
        end
      end
      return res.join(" OR ")
    end

    def search_terms
      ["%#{term.mb_chars.downcase}%"] * count_fesse
    end

    def count_fesse
      count = 0
      search_attributes.each do |attr|
        res = column_to_query(attr)
        if res.is_a?(String)
          res = res.split
        end
        count += res.size
      end
      return count
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
        attr_field = attribute_types[attr].searchable_field
        ActiveRecord::Base.connection.quote_column_name(attr_field)
        return attr_field
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
