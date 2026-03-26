require_relative "base"

module Administrate
  module Field
    class Date < Base
      def date
        I18n.localize(
          data.in_time_zone(timezone).to_date,
          format: format,
          default: fallback_format
        )
      end

      private

      def format
        options.fetch(:format, default_format)
      end

      def default_format
        :administrate_date_default
      end

      def fallback_format
        I18n.t("date.formats.default", default: "%Y-%m-%d")
      end

      def timezone
        options.fetch(:timezone, ::Time.zone)
      end
    end
  end
end
