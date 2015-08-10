require_relative "base"

module Administrate
  module Field
    class HasOne < BelongsTo
      def self.permitted_attribute(attr)
        attr
      end
    end
  end
end
