require_relative "base"
require "active_support/number_helper"

module Administrate
  module Field
    class Number < Field::Base
      def to_s
        result = data.nil? ? "-" : format_string % value
        result = format(result) if options[:format]
        prefix + result + suffix
      end

      private

      def format_string
        "%.#{decimals}f"
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

      def format(result)
        formatter = options[:format][:formatter]
        formatter_options = options[:format][:formatter_options].to_h

        case formatter
        when :number_to_delimited
          ActiveSupport::NumberHelper.number_to_delimited(
            result, **formatter_options
          )
        else
          result
        end
      end
    end
  end
end
