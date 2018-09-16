module Administrate
  class Order
    def initialize(attribute = nil, direction = nil, field = nil)
      @attribute = attribute
      @direction = direction || :asc
      @field = field
    end

    def apply(relation)
      return order_by_association(relation) unless
        reflect_association(relation).nil?

      order = "#{relation.table_name}.#{attribute} #{direction}"

      return relation.reorder(order) if
        relation.columns_hash.keys.include?(attribute.to_s)

      relation
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

    attr_reader :attribute, :field

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

    def order_by_association(relation)
      return order_by_count(relation) if has_many_attribute?(relation)

      if belongs_to_attribute?(relation)
        return field ? order_by_attribute(relation) : order_by_id(relation)
      end

      relation
    end

    def order_by_count(relation)
      relation.
      left_joins(attribute.to_sym).
      group(:id).
      reorder("COUNT(#{attribute}.id) #{direction}")
    end

    def order_by_id(relation)
      relation.reorder("#{attribute}_id #{direction}")
    end

    def order_by_attribute(relation)
      relation.
        joins(attribute.to_sym).
        reorder("#{attribute.pluralize}.#{field} #{direction}")
    end

    def has_many_attribute?(relation)
      reflect_association(relation).macro == :has_many
    end

    def belongs_to_attribute?(relation)
      reflect_association(relation).macro == :belongs_to
    end

    def reflect_association(relation)
      relation.klass.reflect_on_association(attribute.to_s)
    end
  end
end
