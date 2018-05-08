require_relative "base"

module Administrate
  module Field
    class Email < Field::Base
      def self.searchable?
        true
      end

      def short_plain_text
        data
      end
    end
  end
end
