require "administrate/field/base"

module Administrate
  module Field
    class RichText < Administrate::Field::Base
      def to_s
        data&.to_plain_text
      end

      def truncate
        to_s.truncate(truncation_length)
      end

      private

      def truncation_length
        options.fetch(:truncate, 50)
      end
    end
  end
end
