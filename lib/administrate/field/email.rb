require_relative "base"

module Administrate
  module Field
    class Email < Field::Base
      def self.searchable?
        true
      end

      def search_requires_string_cast?
        false
      end
    end
  end
end
