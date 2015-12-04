module Administrate
  class Search
    BLACKLISTED_WORDS = %w{destroy remove delete update create}

    attr_reader :resolver, :term, :scope

    def initialize(resolver, term)
      @resolver = resolver
      @scope = search_scope(term.split.first)
      @term = term[scope_length..-1].strip
    end

    def run
      if @term.blank?
        resource_class.all
      elsif scope
        resource_class.send scope
      else
        resource_class.where(query, *search_terms)
      end
    end

    private

    delegate :resource_class, to: :resolver

    def query
      search_attributes.map { |attr| "lower(#{attr}) LIKE ?" }.join(" OR ")
    end

    def search_terms
      ["%#{term.downcase}%"] * search_attributes.count
    end

    def search_attributes
      resolver.dashboard_class::ATTRIBUTE_TYPES.select do |_, type|
        type.searchable?
      end.keys
    end

    def search_scope(term)
      if (term[-1, 1] == ":")
        possible_scope = term[0..-2]
        possible_scope if resource_class.respond_to?(possible_scope) &&
                          !banged?(possible_scope) &&
                          !blacklisted_scope?(possible_scope)
      end
    end

    def scope_length
      (@scope && (@scope.length + 1)) || 0
    end

    def banged?(method)
      method[-1, 1] == "!"
    end

    def blacklisted_scope?(scope)
      BLACKLISTED_WORDS.each do |word|
        return true if scope =~ /.*#{word}.*/i
      end
      false
    end
  end
end
