require_relative "base"

module Administrate
  module Field
    class Password < Field::Base
      def self.searchable?
        false
      end

      def truncate
        pretty_data.to_s[0...6]
      end

      private

      def pretty_data
        data.gsub(/./, "•") unless data.nil?
      end
    end
  end
end
