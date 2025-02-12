require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"

module Administrate
  class Search
    class Query
      attr_reader :filters, :valid_filters

      def blank?
        terms.blank? && filters.empty?
      end

      def initialize(original_query, valid_filters = nil)
        @original_query = original_query
        @valid_filters = valid_filters
        @filters, @terms = parse_query(original_query)
      end

      def original
        @original_query
      end

      def terms
        @terms.join(" ")
      end

      def to_s
        original
      end

      private

      def filter?(word)
        valid_filters&.any? { |filter| word.match?(/^#{filter}:/) }
      end

      def parse_query(query)
        filters = []
        terms = []
        query.to_s.split.each do |word|
          if filter?(word)
            filters << word
          else
            terms << word
          end
        end
        [filters, terms]
      end
    end

    def initialize(scoped_resource, dashboard, term)
      @dashboard = dashboard
      @scoped_resource = scoped_resource
      @query = Query.new(term, valid_filters.keys)
    end

    def run
      if query.blank?
        @scoped_resource.all
      else
        results = search_results(@scoped_resource)
        filter_results(results)
      end
    end

    private

    def apply_filter(filter, filter_param, resources)
      return resources unless filter
      if filter.parameters.size == 1
        filter.call(resources)
      else
        filter.call(resources, filter_param)
      end
    end

    def filter_results(resources)
      query.filters.each do |filter_query|
        filter_name, filter_param = filter_query.split(":")
        filter = valid_filters[filter_name]
        resources = apply_filter(filter, filter_param, resources)
      end
      resources
    end

    def query_template
      search_attributes.map do |attr|
        table_name = query_table_name(attr)
        searchable_fields(attr).map do |field|
          attribute_type = attribute_types[attr]
          column_name = column_to_query(field)

          search_target = "#{table_name}.#{column_name}"
          search_target = "CAST(#{search_target} AS CHAR(256))" if attribute_type.search_requires_string_cast?
          search_target = "LOWER(#{search_target})" if attribute_type.search_lower?

          if attribute_types[attr].search_exact?
            "#{search_target} = ?"
          else
            "#{search_target} LIKE ?"
          end
        end.join(" OR ")
      end.join(" OR ")
    end

    def searchable_fields(attr)
      return [attr] unless association_search?(attr)

      attribute_types[attr].searchable_fields
    end

    def query_values
      search_attributes.flat_map do |attr|
        attribute_type = attribute_types[attr]

        search_term = if attribute_type.search_lower?
          term.mb_chars.downcase
        else
          term.mb_chars
        end

        if attribute_type.search_exact?
          [search_term] * searchable_fields(attr).count
        else
          ["%#{search_term}%"] * searchable_fields(attr).count
        end
      end
    end

    def search_attributes
      @dashboard.search_attributes
    end

    def search_results(resources)
      resources
        .left_joins(tables_to_join)
        .where(query_template, *query_values)
    end

    def valid_filters
      if @dashboard.class.const_defined?(:COLLECTION_FILTERS)
        @dashboard.class.const_get(:COLLECTION_FILTERS).stringify_keys
      else
        {}
      end
    end

    def attribute_types
      @dashboard.class.const_get(:ATTRIBUTE_TYPES)
    end

    def query_table_name(attr)
      if association_search?(attr)
        provided_class_name = attribute_types[attr].options[:class_name]
        unquoted_table_name =
          if provided_class_name
            Administrate.warn_of_deprecated_option(:class_name)
            provided_class_name.constantize.table_name
          else
            @scoped_resource.reflect_on_association(attr).klass.table_name
          end
        ActiveRecord::Base.connection.quote_table_name(unquoted_table_name)
      else
        ActiveRecord::Base.connection
          .quote_table_name(@scoped_resource.table_name)
      end
    end

    def column_to_query(attr)
      ActiveRecord::Base.connection.quote_column_name(attr)
    end

    def tables_to_join
      attribute_types.keys.select do |attribute|
        attribute_types[attribute].searchable? && association_search?(attribute)
      end
    end

    def association_search?(attribute)
      attribute_types[attribute].associative?
    end

    def term
      query.terms
    end

    attr_reader :resolver, :query
  end
end
