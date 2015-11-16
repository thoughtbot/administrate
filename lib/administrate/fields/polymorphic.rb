require_relative "associative"

module Administrate
  module Field
    class Polymorphic < Associative
      protected

      def associated_dashboard
        "#{data.class.name}Dashboard".constantize.new
      end
    end
  end
end
