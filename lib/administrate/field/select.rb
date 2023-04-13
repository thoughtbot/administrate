require_relative "base"

module Administrate
  module Field
    class Select < Field::Base
      def self.searchable?
        true
      end

      def selectable_options
        values = options.fetch(:collection, [])

        if values.respond_to? :call
          values = values.arity.positive? ? values.call(self) : values.call
        end

        values
      end

      def include_blank_option
        options.fetch(:include_blank, false)
      end
    end
  end
end
