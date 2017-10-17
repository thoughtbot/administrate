require_relative "base"

module Administrate
  module Field
    class Select < Field::Base
      def self.search_query(table_field, search_term)
        ["lower(#{table_field}) LIKE ?", "%#{search_term.mb_chars.downcase}%"]
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
