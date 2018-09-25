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

      def label_data
        case collection.first
        when NilClass
          nil
        when Array
          pair = collection.detect { |l,v| v.to_s == data.to_s } || []
          pair.first
        else
          collection.detect { |v| v.to_s == data.to_s }
        end
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
