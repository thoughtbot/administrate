require_relative "base"

module Administrate
  module Field
    class Password < Field::Base
      def self.searchable?
        false
      end

      def truncate
        pretty_data.to_s[0...truncation_length]
      end

      private

      def pretty_data
        data.gsub(/./, "*") unless data.nil?
      end

      def truncation_length
        options.fetch(:truncate, 8)
      end
    end
  end
end
