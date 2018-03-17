require_relative "base"

module Administrate
  module Field
    class Time < Base
      def short_plain_text
        data.strftime("%I:%M%p").to_s
      end
    end
  end
end
