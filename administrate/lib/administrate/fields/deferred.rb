module Administrate
  module Field
    class Deferred
      def initialize(klass, options = {})
        @klass = klass
        @options = options
      end

      def new(*args)
        klass.new(*args, options)
      end

      delegate :permitted_attribute, to: :klass

      private

      attr_reader :klass, :options
    end
  end
end
