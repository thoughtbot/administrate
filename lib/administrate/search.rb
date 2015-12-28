require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"

module Administrate
  class Search
    BLACKLISTED_WORDS = %w{destroy remove delete update create}

    attr_reader :resolver, :term, :words

    def initialize(resolver, term)
      @term = term
      @resolver = resolver
      @words, @scopes = words_and_scopes_of(term ? term.split : [])
    end

    def scopes
      @scopes.map(&:name)
    end

    def arguments
      @scopes.map(&:argument)
    end

    def scope
      scopes.first
    end

    def run
      if @term.blank? and @scopes.empty?
        resource_class.all
      else
        resources = resource_class.where(query, *search_terms) unless @term.blank?
        @scopes.each do |scope|
          resources = if scope.argument
                        resources.public_send scope.name, scope.argument
                      else
                        resources.public_send scope.name
                      end
        end
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
      ["%#{words.join.downcase}%"] * search_attributes.count
    end

    def search_attributes
      attribute_types.keys.select do |attribute|
        attribute_types[attribute].searchable?
      end
    end

    def attribute_types
      resolver.dashboard_class::ATTRIBUTE_TYPES
    end

    # Extracts the possible scope from *term* (a single word string) and
    # returns it if the model responds to it and is a valid_scope?
    def scope_object(term)
      if term && (/scope:(?<possible_scope>.+)/i =~ term)
        obj = build_scope_ostruct(possible_scope)
        obj if resource_class.respond_to?(obj.name) &&
            valid_scope?(obj.name)
      end
    end

    def build_scope_ostruct(user_input)
      if /(?<scope_name>\w+)\((?<argument>\w+)\)/ =~ user_input
        OpenStruct.new(name: scope_name, argument: argument)
      else
        OpenStruct.new(name: user_input, argument: nil)
      end
    end

    # If the Dashboard has defined its COLLECTION_SCOPES returns true if the
    # method is included in it. Otherwise returns true if it's not blacklisted
    # nor ending with an exclamation mark (banged).
    def valid_scope?(method)
      if collection_scopes.any?
        collection_scopes.include? method.to_sym
      else
        !banged?(method) && !blacklisted_scope?(method)
      end
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

    # Recursive function that takes a splited search string (term) as input and
    # returns an array with two arrays: the first with the ordinary words and
    # the other with the scopes.
    def words_and_scopes_of(terms, words = [], scopes = [])
      if terms.any?
        first_term = terms.shift
        if scope_obj = scope_object(first_term)
          words_and_scopes_of terms, words, scopes.push(scope_obj)
        else
          words_and_scopes_of terms, words.push(first_term), scopes
        end
      else
        [words, scopes]
      end
    end
  end
end
