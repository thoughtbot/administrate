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
      search_attributes.map { |attr| "#{attr} ILIKE ?" }.join(" OR ")
    end

    def search_terms
      ["%#{term}%"] * search_attributes.count
    end

    def search_attributes
      resolver.dashboard_class::ATTRIBUTE_TYPES.select do |_, type|
        type.searchable?
      end.keys
    end

    attr_reader :resolver, :term
  end
end
