require_relative "base"

module Administrate
  module Field
    class String < Field::Base
      def self.searchable?
        true
      end

      def truncate
        data.to_s[0...truncation_length]
      end

      alias_method :short_plain_text, :truncate

      private

      def truncation_length
        options.fetch(:truncate, 50)
      end
    end
  end
end
