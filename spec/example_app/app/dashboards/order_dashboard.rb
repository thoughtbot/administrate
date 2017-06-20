require "administrate/base_dashboard"
require "administrate/default_search"

class OrderDashboard < Administrate::BaseDashboard
  class TotalAtLeast < Administrate::DefaultSearch
    def build_query(table_name, _attr_name)
      subquery = LineItem.
        select(:order_id).
        distinct.
        where('unit_price * quantity > ?').
        to_sql
      %{#{table_name}."id" IN (#{subquery})}
    end

    def build_search_value(term)
      term.scan(/\d+/).first.to_i
    end
  end

  ATTRIBUTE_TYPES = {
    id: Field::Number,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    address_line_one: Field::String,
    address_line_two: Field::String,
    address_city: Field::String,
    address_state: Field::String,
    address_zip: Field::String,
    customer: Field::BelongsTo,
    line_items: Field::HasMany,
    total_price: Field::Number.with_options(
      searchable: TotalAtLeast,
      prefix: "$",
      decimals: 2,
    ),
    shipped_at: Field::DateTime,
    payments: Field::HasMany,
  }

  READ_ONLY_ATTRIBUTES = [
    :id,
    :total_price,
    :created_at,
    :updated_at,
  ]

  COLLECTION_ATTRIBUTES = [
    :id,
    :customer,
    :address_state,
    :total_price,
    :line_items,
    :shipped_at,
  ]

  FORM_ATTRIBUTES = ATTRIBUTE_TYPES.keys - READ_ONLY_ATTRIBUTES
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys
end
