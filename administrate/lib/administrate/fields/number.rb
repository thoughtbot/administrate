require_relative "base"

module Administrate
  module Field
    class Number < Field::Base
      def to_s
        format_string % data
      end

      private

      def format_string
        prefix + "%.#{decimals}f"
      end

      def prefix
        options[:prefix].to_s
      end

      def decimals
        options.fetch(:decimals, 0)
      end
    end
  end
end
