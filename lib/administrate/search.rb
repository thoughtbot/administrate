require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"

module Administrate
  class Search
    def initialize(resolver, term)
      @resolver = resolver
      @term = term
    end

    def run
      if @term.blank?
        resource_class.all
      else
        resource_class.where(query, *search_terms)
      end
    end

    private

    delegate :resource_class, to: :resolver

    def query
      conditions = search_attributes.map do |attr|
        "lower(#{quote_attr(attr)}) LIKE ?"
      end
      conditions.join(" OR ")
    end

    def search_terms
      ["%#{term.downcase}%"] * search_attributes.count
    end

    def search_attributes
      if defined?(@resolver.dashboard_class::SEARCH_ATTRIBUTES)
        @resolver.dashboard_class::SEARCH_ATTRIBUTES
      else
        attribute_types.keys.select do |attribute|
          attribute_types[attribute].searchable?
        end
      end
    end

    def attribute_types
      resolver.dashboard_class::ATTRIBUTE_TYPES
    end

    def quote_attr(attr)
      resource_class.connection.quote_column_name(attr)
    end

    attr_reader :resolver, :term
  end
end
