require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"
require "administrate/field/boolean"

module Administrate
  class Search
    ADVANCED_CLAUSE_REGEX = /(\w*)\:((?:["'].*?["'])|(?:\w+))/

    def initialize(scoped_resource, dashboard_class, term)
      @dashboard_class = dashboard_class
      @scoped_resource = scoped_resource
      @term = term
    end

    def run
      if @term.blank?
        @scoped_resource.all
      else
        add_advanced_clauses(basic_clause)
      end
    end

    private

    def basic_clause
      if basic_term.blank?
        @scoped_resource.all
      else
        @scoped_resource.joins(tables_to_join).
          where(basic_query, *basic_search_terms)
      end
    end

    def basic_query
      basic_search_attributes.map(&method(:build_query_string)).join(" OR ")
    end

    def build_query_string(attr)
      table_name = query_table_name(attr)
      attr_name = column_to_query(attr)

      "LOWER(CAST(#{table_name}.#{attr_name} AS CHAR(256))) LIKE ?"
    end

    def basic_search_terms
      [build_interpolatee(basic_term)] * basic_search_attributes.count
    end

    def build_interpolatee(value)
      "%#{value.mb_chars.downcase}%"
    end

    def basic_term
      term.gsub(ADVANCED_CLAUSE_REGEX, "").strip
    end

    def basic_search_attributes
      attribute_types.keys.select do |attribute|
        attribute_types[attribute].searchable? &&
          !advanced_search_clauses.key?(attribute)
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

    def advanced_search_clauses
      @advanced_search_clauses ||= begin
        # Match "attribute:value" OR "attribute:'value with spaces'"
        raw_clauses = @term.scan ADVANCED_CLAUSE_REGEX
        raw_clauses.map { |raw| [raw[0].to_sym, raw[1].tr('"\'', "")] }.to_h
      end
    end

    def add_advanced_clauses(resource_collection)
      advanced_search_clauses.each do |field, value|
        attribute = field.to_sym
        next unless attribute_types.key?(attribute) &&
            !association_search?(attribute)
        if attribute_types[attribute].searchable?
          resource_collection = resource_collection.where(
            build_query_string(attribute), build_interpolatee(value)
          )
        elsif attribute_types[attribute] == Administrate::Field::Boolean
          truthy = %w[true yes 1].include?(value.downcase)
          resource_collection = resource_collection.where(
            attribute => truthy,
          )
        end
      end
      resource_collection
    end

    attr_reader :resolver, :term
  end
end
