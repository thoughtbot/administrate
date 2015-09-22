module Administrate
  class Order
    def initialize(attribute = nil, direction = nil)
      @attribute = attribute
      @direction = direction || :asc
    end

    def apply(relation)
      if relation.columns_hash.keys.include?(attribute.to_s)
        relation.order(attribute => direction)
      else
        relation
      end
    end

    def ordered_by?(attr)
      attr.to_s == attribute.to_s
    end

    def order_params_for(attr)
      {
        order: attr,
        direction: reversed_direction_param_for(attr)
      }
    end

    attr_reader :direction

    private

    attr_reader :attribute

    def reversed_direction_param_for(attr)
      if ordered_by?(attr)
        opposite_direction
      else
        :asc
      end
    end

    def opposite_direction
      direction.to_sym == :asc ? :desc : :asc
    end
  end
end
