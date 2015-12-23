require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"

module Administrate
  class Search
    BLACKLISTED_WORDS = %w{destroy remove delete update create}

    attr_reader :resolver, :term, :scope

    def initialize(resolver, term)
      term ||= ""
      @resolver = resolver
      @scope = search_scope(term.split.first)
      @term = term[scope_length..-1].strip
    end

    def run
      if @term.blank?
        scope ? resource_class.public_send(scope) : resource_class.all
      else
        resources = resource_class.where(query, *search_terms)
        resources = resources.public_send(scope) if scope
        resources
      end
    end

    private

    delegate :resource_class, to: :resolver
    delegate :dashboard_class, to: :resolver

    def query
      search_attributes.map { |attr| "lower(#{attr}) LIKE ?" }.join(" OR ")
    end

    def search_terms
      ["%#{term.downcase}%"] * search_attributes.count
    end

    def search_attributes
      attribute_types.keys.select do |attribute|
        attribute_types[attribute].searchable?
      end
    end

    def attribute_types
      resolver.dashboard_class::ATTRIBUTE_TYPES
    end

    def search_scope(term)
      if term && (term[0..5] =~ /scope:/i)
        possible_scope = term[6..-1]
        possible_scope if resource_class.respond_to?(possible_scope) &&
                          valid_scope?(possible_scope)
      end
    end

    def valid_scope?(method)
      if collection_scopes.any?
        collection_scopes.include? method.to_sym
      else
        !banged?(method) && !blacklisted_scope?(method)
      end
    end

    def scope_length
      (@scope && (@scope.length + 6)) || 0
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

    def collection_scopes
      if dashboard_class.const_defined?(:COLLECTION_SCOPES)
        dashboard_class.const_get(:COLLECTION_SCOPES)
      else
        []
      end
    end
  end
end
