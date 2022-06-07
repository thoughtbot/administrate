module Administrate
  class Order
    def initialize(attribute = nil, direction = nil, field = nil)
      @attribute = attribute
      @direction = sanitize_direction(direction)
      @field = field
    end

    def apply(relation)
      return order_by_association(relation) unless
        reflect_association(relation).nil?

      order = "#{relation.table_name}.#{attribute} #{direction}"

      return relation.reorder(Arel.sql(order)) if
        column_exist?(relation, attribute)

      relation
    end

    def column_exist?(table, column_name)
      table.columns_hash.key?(column_name.to_s)
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

    def sanitize_direction(direction)
      %w[asc desc].include?(direction.to_s) ? direction.to_sym : :asc
    end

    def reversed_direction_param_for(attr)
      if ordered_by?(attr)
        opposite_direction
      else
        :asc
      end
    end

    def opposite_direction
      direction == :asc ? :desc : :asc
    end

    def order_by_association(relation)
      return order_by_count(relation) if has_many_attribute?(relation)

      return order_by_attribute(relation) if belongs_to_attribute?(relation)

      relation
    end

    def order_by_count(relation)
      klass = reflect_association(relation).klass
      query = "COUNT(#{klass.table_name}.#{klass.primary_key}) #{direction}"
      relation.
        left_joins(attribute.to_sym).
        group(:id).
        reorder(Arel.sql(query))
    end

    def order_by_id(relation)
      relation.reorder(Arel.sql(order_by_id_query(relation)))
    end

    def order_by_attribute(relation)
      return order_by_id(relation) unless field

      relation.joins(
        attribute.to_sym,
      ).reorder(Arel.sql(form_query(relation)))
    end

    def form_query(relation)
      return order_by_attribute_query if
        column_exist?(reflect_association(relation).klass, field.to_sym)

      order_by_id_query(relation)
    end

    def order_by_id_query(relation)
      "#{relation.table_name}.#{foreign_key(relation)} #{direction}"
    end

    def order_by_attribute_query
      "#{attribute.tableize}.#{field} #{direction}"
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

    def foreign_key(relation)
      reflect_association(relation).foreign_key
    end
  end
end
