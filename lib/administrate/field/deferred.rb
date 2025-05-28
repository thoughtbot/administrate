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
        new_options = args.last.respond_to?(:merge) ? args.pop : {}
        deferred_class.new(*args, options.merge(new_options))
      end

      def ==(other)
        other.respond_to?(:deferred_class) &&
          deferred_class == other.deferred_class &&
          options == other.options
      end

      def getter
        options.fetch(:getter, nil)
      end

      def associative?
        deferred_class.associative?
      end

      def eager_load?
        deferred_class.eager_load?
      end

      def searchable?
        if options.key?(:getter)
          false
        else
          options.fetch(:searchable, deferred_class.searchable?)
        end
      end

      def searchable_fields
        options.fetch(:searchable_fields)
      end

      def sortable?
        options.fetch(:sortable, deferred_class.sortable?)
      end

      def permitted_attribute(attr, opts = {})
        deferred_class.permitted_attribute(attr, options.merge(opts))
      end

      delegate :html_class, to: :deferred_class
    end
  end
end
