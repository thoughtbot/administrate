require "administrate/base_dashboard"
require "administrate/default_search"

class LineItemDashboard < Administrate::BaseDashboard
  class ProductByName < Administrate::DefaultSearch
    def build_query(table_name, _attr_name)
      subquery = Product.
        select(:id).
        where('LOWER("products"."name") LIKE ?').
        to_sql
      %{#{table_name}."product_id" IN (#{subquery})}
    end

    def build_search_value(term)
      "%#{term.downcase}%"
    end
  end

  class TotalAtLeast < Administrate::DefaultSearch
    def build_query(table_name, _attr_name)
      subquery = LineItem.
        select(:order_id).
        distinct.
        where('unit_price * quantity > ?').
        to_sql
      %{#{table_name}."order_id" IN (#{subquery})}
    end

    def build_search_value(term)
      term.scan(/\d+/).first.to_i
    end
  end

  class UnitPriceAtLeast < Administrate::DefaultSearch
    def build_query(table_name, attr_name)
      "#{table_name}.#{attr_name} >= ?"
    end

    def build_search_value(term)
      term.scan(/\d+/).first.to_i
    end
  end

  ATTRIBUTES = [
    :order,
    :product,
    :quantity,
    :unit_price,
  ]

  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    order: Field::BelongsTo,
    product: Field::BelongsTo.with_options(searchable: ProductByName),
    quantity: Field::Number,
    total_price: Field::Number.with_options(
      searchable: TotalAtLeast,
      prefix: "$",
      decimals: 2,
    ),
    unit_price: Field::Number.with_options(
      searchable: UnitPriceAtLeast,
      prefix: "$",
      decimals: 2,
    ),
  }

  COLLECTION_ATTRIBUTES = ATTRIBUTES + [:total_price]
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES + [:total_price]
  FORM_ATTRIBUTES = ATTRIBUTES

  def display_resource(line_item)
    "Line Item #%04d" % line_item.id
  end
end
