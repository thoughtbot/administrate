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
      search_attributes.map do |attr, field_class|
        field_class.search_predicate(attr, term)
      end.compact.join(" OR ")
    end

    def search_terms
      search_attributes.map do |attr, field_class|
        field_class.search_term(attr, term)
      end.compact
    end

    def search_attributes
      @search_attributes ||=
        attribute_types.keys.reduce({}) do |attrs, attribute|
          field_class = attribute_types[attribute]
          if field_class.searchable?
            attrs.merge(attribute => field_class)
          else
            attrs
          end
        end
    end

    def attribute_types
      resolver.dashboard_class::ATTRIBUTE_TYPES
    end

    attr_reader :resolver, :term
  end
end
