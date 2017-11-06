require_relative "base"

module Administrate
  module Field
    class Select < Field::Base
      def self.search_query(table_field, search_term)
        default_text_search(table_field, search_term)
      end

      def selectable_options
        collection
      end

      private

      def collection
        @collection ||= options.fetch(:collection, [])
      end
    end
  end
end
