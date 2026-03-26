require_relative "base"

module Administrate
  module Field
    class DateTime < Base
      def date
        I18n.localize(
          data.in_time_zone(timezone).to_date,
          format: format(type: :date),
          default: fallback_format(type: :date)
        )
      end

      def datetime
        I18n.localize(
          data.in_time_zone(timezone),
          format: format(type: :datetime),
          default: fallback_format(type: :datetime)
        )
      end

      private

      def format(type: :date)
        options.fetch(:format, default_format(type: type))
      end

      def default_format(type: :date)
        :"administrate_#{type}_default"
      end

      def fallback_format(type: :date)
        if type == :date
          I18n.t("date.formats.default", default: "%Y-%m-%d")
        else
          I18n.t("time.formats.default", default: "%Y-%m-%d %H:%M")
        end
      end

      def timezone
        options.fetch(:timezone, ::Time.zone)
      end
    end
  end
end
