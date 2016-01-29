require "active_support/core_ext/module/delegation"
require "active_support/core_ext/object/blank"

module Administrate
  class Search
    # Only used if dashboard's COLLECTION_SCOPES is not defined
    BLACKLISTED_WORDS = %w{destroy remove delete update create}.freeze

    attr_reader :resolver, :term, :words

    def initialize(resolver, term)
      @term = term.to_s.strip
      @resolver = resolver
      @words, @scopes = words_and_scopes_of(@term ? @term.split : [])
    end

    def scopes
      @scopes.map(&:name)
    end

    def arguments
      @scopes.map(&:argument)
    end

    def scopes_with_arguments
      @scopes.map(&:user_input)
    end

    def scope
      scopes.first
    end

    def run
      if @term.blank?
        resource_class.all
      else
        resources = if @words.empty?
                      resource_class.all
                    else
                      resource_class.where(query, *search_terms)
                    end
        filter_with_scopes(resources)
      end
    end

    private

    delegate :resource_class, to: :resolver
    delegate :dashboard_class, to: :resolver

    def filter_with_scopes(resources)
      @scopes.each do |scope|
        resources = if scope.argument
                      resources.public_send scope.name, scope.argument
                    else
                      resources.public_send scope.name
                    end
      end
      resources
    end

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
      if term && (/(?<left_part>\w+):(?<right_part>.+)/i =~ term)
        obj = build_scope_ostruct(left_part, right_part)
        obj if resource_class.respond_to?(obj.name) && valid_scope?(obj)
      end
    end

    def build_scope_ostruct(left_part, right_part)
      if left_part.downcase == "scope"
        user_input = right_part
        if /(?<scope_name>\w+)\((?<scope_argument>\w+)\)/ =~ right_part
          name = scope_name
          argument = scope_argument
        else
          name = user_input
          argument = nil
        end
      else
        user_input = "#{left_part}:#{right_part}"
        name = left_part
        argument = right_part
      end
      OpenStruct.new(user_input: user_input, name: name, argument: argument)
    end

    # If the Dashboard has defined its COLLECTION_SCOPES returns true if the
    # possible_scope is included in it (i.e. whitelisted). Otherwise returns
    # true if it's not blacklisted nor ending with an exclamation mark.
    def valid_scope?(scope_obj)
      if collection_scopes.any?
        collection_scopes_include?(scope_obj.user_input) ||
          wildcarded_scope?(scope_obj.name)
      else
        !banged?(scope_obj.user_input) &&
        !blacklisted_scope?(scope_obj.user_input)
      end
    end

    def collection_scopes_include?(s)
      collection_scopes.include?(s) || collection_scopes.include?(s.to_sym)
    end

    def wildcarded_scope?(scope)
      collection_scopes.include?("#{scope}:*")
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
      @_scopes ||= if dashboard_class.const_defined?(:COLLECTION_SCOPES)
                     const = dashboard_class.const_get(:COLLECTION_SCOPES)
                     const.is_a?(Array) ? const : const.values.flatten
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
