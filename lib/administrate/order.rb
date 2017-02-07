module Administrate
  class Order
    def initialize(attribute = nil, direction = nil)
      @attribute = attribute
      @direction = direction || :asc
    end

    def apply(relation)
      if relation.columns_hash.keys.include?(attribute.to_s)
        relation.order(attribute => direction)
      elsif association?(relation)
        AssociationOrder.new(relation, attribute, direction).relation_with_order
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

    def association?(relation)
      if relation.respond_to? :reflect_on_association
        relation.reflect_on_association(attribute)
      end
    end

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

  class AssociationOrder
    def initialize(relation, attribute, direction)
      @relation = relation
      @attribute = attribute
      @direction = direction
    end

    def relation_with_order
      association ? relation.includes(association.name).order("#{association.plural_name}.#{order_name} #{direction_for_sql}") : relation
    end

    def order_name
      if association.klass.respond_to? :default_sort
      association.klass.default_sort
      else
        :name
      end
    end

    def direction_for_sql
      if direction.to_sym == :asc
        "ASC"
      else
        "DESC"
      end
    end

    private

    def association
      relation.reflect_on_association(attribute)
    end

    attr_reader :relation, :attribute, :direction
  end
end
