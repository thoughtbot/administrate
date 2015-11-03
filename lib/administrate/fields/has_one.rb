require_relative "base"
require_relative "belongs_to"

module Administrate
  module Field
    class HasOne < BelongsTo
      def self.permitted_attribute(attr)
        attr
      end
    end
  end
end
