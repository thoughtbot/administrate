require_relative "base"

module Administrate
  module Field
    class Select < Field::Base
      def self.searchable?
        true
      end

      def selectable_options
        collection
      end

      private

      def collection
        maybe_proc = options.fetch(:collection, [])
        return maybe_proc.call if maybe_proc.respond_to? :call

        @collection ||= maybe_proc
      end
    end
  end
end
