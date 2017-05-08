require_relative "base"

module Administrate
  module Field
    class DateTime < Base
      def date
        I18n.localize(data.to_date, format: format)
      end

      def datetime
        I18n.localize(data, format: format, default: data)
      end

      private

      def format
        options.fetch(:format, :default)
      end
    end
  end
end
