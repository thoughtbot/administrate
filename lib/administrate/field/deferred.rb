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

      def permitted_attribute(attr)
        deferred_class.permitted_attribute(attr, options)
      end

      def searchable?
        options.fetch(:searchable, deferred_class.searchable?)
      end

      delegate :html_class, to: :deferred_class
    end
  end
end
