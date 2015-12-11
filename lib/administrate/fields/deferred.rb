require "active_support/core_ext/module/delegation"

module Administrate
  module Field
    class Deferred
      def initialize(deferred_class, options = {})
        @deferred_class = deferred_class
        @options = options
      end

      attr_reader :deferred_class, :options

      def new(*args)
        deferred_class.new(*args, options)
      end

      def ==(other)
        other.respond_to?(:deferred_class) &&
          deferred_class == other.deferred_class &&
          options == other.options
      end

      def searchable?
        options.fetch(:searchable, deferred_class.searchable?)
      end

      def enum_options
        options.fetch(:enum, nil)
      end

      def search_predicate(attribute, term)
        if enum_options
          deferred_class.search_predicate(attribute, term, enum_options)
        else
          deferred_class.search_predicate(attribute, term)
        end
      end

      def search_term(attribute, term)
        if enum_options
          deferred_class.search_term(attribute, term, enum_options)
        else
          deferred_class.search_term(attribute, term)
        end
      end

      delegate(
        :html_class,
        :permitted_attribute,
        to: :deferred_class,
      )
    end
  end
end
