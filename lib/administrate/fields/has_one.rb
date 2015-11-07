require_relative "associative"

module Administrate
  module Field
    class HasOne < Associative
      def self.permitted_attribute(attr)
        attr
      end
    end
  end
end
