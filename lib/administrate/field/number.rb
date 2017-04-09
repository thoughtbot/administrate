require_relative "base"

module Administrate
  module Field
    class Number < Field::Base
      def to_s
        if data.nil?
          "-"
        else
          format_string % value
        end
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
        options.fetch(:decimals, 0)
      end

      def value
        data * options.fetch(:multiplier, 1)
      end
    end
  end
end
