require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"
require "administrate/default_search"

module Administrate
  class Search
    class SearchStrategy
      def initialize(
        search_attributes,
        term,
        resource_class: nil,
        table_name: nil
      )
        if table_name
          @table_name = table_name
        elsif resource_class
          @table_name = ActiveRecord::Base.connection.quote_table_name(
            resource_class.table_name,
          )
        else
          raise ArgumentError, "resource_class or table_name is required"
        end
        @search_attributes = search_attributes
        @term = term
      end

      def attr_name(name)
        ActiveRecord::Base.connection.quote_column_name(name)
      end
    end

    class NilSearchStrategy < SearchStrategy
      def blank?
        true
      end
    end

    class StringBasedSearchStrategy < SearchStrategy
      def blank?
        false
      end

      def query
        @search_attributes.map do |name, attr|
          attr.searchable.with_context(@term).query(
            @table_name,
            attr_name(name),
          )
        end.join(" OR ")
      end

      def search_terms
        @search_attributes.map do |_name, attr|
          attr.searchable.with_context(@term).search_term
        end.flatten
      end
    end

    class HashBasedSearchStrategy < SearchStrategy
      def blank?
        query.blank?
      end

      def query
        @search_attributes.map do |name, attr|
          term = @term[name] || @term[:all]
          next if term.blank?
          attr.searchable.with_context(term).query(@table_name, attr_name(name))
        end.compact.flatten.join(" #{@term.fetch(:op, 'OR').upcase} ")
      end

      def search_terms
        @search_attributes.map do |name, attr|
          term = @term[name] || @term[:all]
          next if term.blank?
          attr.searchable.with_context(term).search_term
        end.compact.flatten
      end
    end

    def initialize(resolver, term)
      @resolver = resolver
      @term = term
      if term.is_a?(String)
        search_strategy_cls = StringBasedSearchStrategy
      elsif term.is_a?(Hash)
        search_strategy_cls = HashBasedSearchStrategy
      elsif term.nil?
        search_strategy_cls = NilSearchStrategy
      else
        raise ArgumentError,
          "cannot determine search strategy for a #{term.class}"
      end
      @search_strategy = search_strategy_cls.new(
        search_attributes,
        @term,
        resource_class: resource_class,
      )
    end

    def run
      if @term.blank? || @search_strategy.blank?
        resource_class.all
      else
        resource_class.where(query, *search_terms)
      end
    end

    private

    delegate :resource_class, to: :resolver
    delegate :query, :search_terms, to: :@search_strategy

    def search_attributes
      attribute_types.select { |_name, type| type.searchable? }
    end

    def attribute_types
      resolver.dashboard_class::ATTRIBUTE_TYPES
    end

    attr_reader :resolver, :term
  end
end
