require_relative "base"

module Administrate
  module Field
    class Boolean < Base
      def to_s
        data.nil? ? "-" : data.to_s
      end

      def render_page
        to_s if %i[index show].include? page
      end
    end
  end
end
