require_relative "text"

module Administrate
  module Field
    class String < Field::Text
      def self.searchable?
        true
      end
    end
  end
end
