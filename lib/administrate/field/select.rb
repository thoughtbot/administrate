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

      def label_data
        case collection.first
        when NilClass
          nil
        when Array
          pair = collection.detect { |_, v| v.to_s == data.to_s } || []
          pair.first
        else
          collection.detect { |v| v.to_s == data.to_s }
        end
      end

      private

      def collection
        @collection ||= options.fetch(:collection, []).to_a
      end
    end
  end
end
