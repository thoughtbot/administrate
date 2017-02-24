require_relative "base"

module Administrate
  module Field
    class Time < Base
      def default
        data && data.strftime("%H:%M:%S")
      end
    end
  end
end
