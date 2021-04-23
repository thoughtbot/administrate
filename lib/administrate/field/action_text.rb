require_relative "base"

module Administrate
  module Field
    class ActionText < Field::Base
      def to_s
        data
      end
    end
  end
end
