require_relative "base"

module Administrate
  module Field
    class Select < Field::Base
      def self.searchable?
        true
      end

      def selectable_options
        collection
      end

      def include_blank_option
        options.fetch(:include_blank, false)
      end

      private

      def collection
        values = options.fetch(:collection, [])
        if values.respond_to? :call
          return values.arity.positive? ? values.call(self) : values.call
        end

        @collection ||= values
      end
    end
  end
end
