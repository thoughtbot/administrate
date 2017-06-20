require_relative "base"

module Administrate
  module Field
    class Email < Field::Base
      def self.searchable?
        true
      end

      def self.searchable
        DEFAULT_SEARCH_IMPL
      end
    end
  end
end
