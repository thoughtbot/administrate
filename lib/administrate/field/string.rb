require_relative "base"

module Administrate
  module Field
    class String < Field::Base
      def self.search_query(table_field, search_term)
        ["LOWER(CAST(#{table_field} AS CHAR(256))) LIKE ?", "%#{search_term.mb_chars.downcase}%"]
      end

      def truncate
        data.to_s[0...truncation_length]
      end

      private

      def truncation_length
        options.fetch(:truncate, 50)
      end
    end
  end
end
