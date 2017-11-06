require_relative "base"

module Administrate
  module Field
    class Email < Field::Base
      def self.search_query(table_field, search_term)
        default_text_search(table_field, search_term)
      end
    end
  end
end
