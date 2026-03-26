require_relative "base"

module Administrate
  module Field
    class Time < Base
      def time
        I18n.localize(
          data,
          format: format,
          default: fallback_format
        )
      end

      private

      def format
        options.fetch(:format, default_format)
      end

      def default_format
        :administrate_time_default
      end

      def fallback_format
        "%I:%M%p"
      end
    end
  end
end
