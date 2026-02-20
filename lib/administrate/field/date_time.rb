require_relative "base"

module Administrate
  module Field
    class DateTime < Base
      def date
        I18n.localize(
          data.in_time_zone(timezone).to_date,
          format: format(type: :date)
        )
      end

      def datetime
        I18n.localize(
          data.in_time_zone(timezone),
          format: format(type: :datetime)
        )
      end

      private

      def format(type: :date)
        options.fetch(:format, :"administrate_#{type}_default")
      end

      def timezone
        options.fetch(:timezone, ::Time.zone)
      end
    end
  end
end
