require_relative "base"

module Administrate
  module Field
    class String < Field::Base
      def self.searchable?
        true
      end

      def truncate
        data.to_s[0...truncation_length]
      end

      def render_page
        case page
        when :index then truncate
        when :show then data
        end
      end

      private

      def truncation_length
        options.fetch(:truncate, 50)
      end
    end
  end
end
