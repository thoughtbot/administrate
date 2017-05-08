require_relative "base"

module Administrate
  module Field
    class Number < Field::Base
      def to_s
        data.nil? ? "-" : format_string % value
      end

      private

      def format_string
        prefix + "%.#{decimals}f" + suffix
      end

      def prefix
        options[:prefix].to_s
      end

      def suffix
        options[:suffix].to_s
      end

      def decimals
        _left, right = data.to_s.split(".")
        default = right.nil? ? 0 : right.size
        options.fetch(:decimals, default)
      end

      def value
        data * options.fetch(:multiplier, 1)
      end
    end
  end
end
