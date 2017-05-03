require_relative "base"

module Administrate
  module Field
    class DateTime < Base
      def render_page
        case page
        when :index then render_index
        when :show then render_show
        end
      end

      private

      def render_index
        I18n.l(data.to_date) if data
      end

      def render_show
        I18n.l(data, default: data) if data
      end
    end
  end
end
