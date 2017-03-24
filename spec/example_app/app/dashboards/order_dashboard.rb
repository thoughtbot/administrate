require "administrate/base_dashboard"

class OrderDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    code: Field::Number,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    address_line_one: Field::String,
    address_line_two: Field::String,
    address_city: Field::String,
    address_state: Field::String,
    address_zip: Field::String,
    customer: Field::BelongsTo,
    line_items: Field::HasMany,
    total_price: Field::Number.with_options(prefix: "$", decimals: 2),
    shipped_at: Field::DateTime,
  }

  READ_ONLY_ATTRIBUTES = [
    :code,
    :total_price,
    :created_at,
    :updated_at,
  ]

  COLLECTION_ATTRIBUTES = [
    :code,
    :customer,
    :address_state,
    :total_price,
    :line_items,
    :shipped_at,
  ]

  FORM_ATTRIBUTES = ATTRIBUTE_TYPES.keys - READ_ONLY_ATTRIBUTES
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys
end
