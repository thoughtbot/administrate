require_relative "base"

module Administrate
  module Field
    class Color < Base
      def to_s
        data
      end
    end
  end
end
