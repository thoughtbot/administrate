require_relative "base"

module Administrate
  module Field
    class Email < Field::Base
      def self.search_query(table_field, search_term)
        ["LOWER(CAST(#{table_field} AS CHAR(256))) LIKE ?", "%#{search_term.mb_chars.downcase}%"]
      end
    end
  end
end
