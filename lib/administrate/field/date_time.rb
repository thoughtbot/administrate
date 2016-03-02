require_relative "base"

module Administrate
  module Field
    class DateTime < Base
      def to_s
        if data.nil?
          ""
        else
         data.strftime(format_date) 
        end
      end

      def format_date
        options[:format] || "%FT%T%:z"
      end
    end
  end
end
