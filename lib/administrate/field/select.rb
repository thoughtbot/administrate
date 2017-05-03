require_relative "base"

module Administrate
  module Field
    class Select < Field::Base
      def self.searchable?
        true
      end

      def render_page
        data if %i[index show].include? page
      end

      def selectable_options
        collection
      end

      private

      def collection
        @collection ||= options.fetch(:collection, [])
      end
    end
  end
end
