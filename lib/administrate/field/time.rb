require_relative "base"

module Administrate
  module Field
    class Time < Base
      def time
        I18n.localize(
          data,
          format: format
        )
      end

      private

      def format
        options.fetch(:format, :administrate_time_default)
      end
    end
  end
end
