require "administrate/field/base"

module Administrate
  module Field
    module Attached
      class Many < Administrate::Field::Base
        delegate :attached?, to: :data, allow_nil: true

        def to_partial_path
          "fields/attached/many/#{page}"
        end
      end
    end
  end
end
