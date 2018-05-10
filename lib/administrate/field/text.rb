require_relative "base"

module Administrate
  module Field
    class Text < Administrate::Field::Base
      def self.default_truncation_length
        50
      end

      def truncate
        data.to_s[0...truncation_length]
      end

      def short_plain_text
        truncate
      end

      private

      def truncation_length
        options.fetch(:truncate, self.class.default_truncation_length)
      end
    end
  end
end
