require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"

module Administrate
  class Search
    class SearchStrategy
      def initialize(resource_class, search_attributes, term)
        @search_attributes, @term = search_attributes, term
        @table_name = ActiveRecord::Base.connection.quote_table_name(resource_class.table_name)
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
          attr.searchable.query(@table_name, attr_name(name))
        end.join(" OR ")
      end

      def search_terms
        @search_attributes.map do |_name, attr|
          attr.searchable.search_term(@term.mb_chars)
        end.flatten
      end
    end

    class HashBasedSearchStrategy < SearchStrategy
      def blank?
        query.blank?
      end

      def query
        @search_attributes.map do |name, attr|
          next unless @term.has_key?(name) || @term.has_key?(:all)
          attr.searchable.query(@table_name, attr_name(name))
        end.compact.join(" #{@term.fetch(:op, 'OR').upcase} ")
      end

      def search_terms
        @search_attributes.map do |name, attr|
          term = @term[name] || @term[:all]
          next if term.blank?
          attr.searchable.search_term(term.is_a?(String) ? term.mb_chars : term)
        end.flatten.compact
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
        raise ArgumentError, "cannot determine search strategy for a #{term.class}"
      end
      @search_strategy = search_strategy_cls.new(resource_class, search_attributes, @term)
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
