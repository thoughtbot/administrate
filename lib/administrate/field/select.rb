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

      alias_method :short_plain_text, :data

      private

      def collection
        @collection ||= options.fetch(:collection, [])
      end
    end
  end
end
