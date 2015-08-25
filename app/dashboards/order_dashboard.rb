require "administrate/base_dashboard"

class OrderDashboard < Administrate::BaseDashboard
  ATTRIBUTES = [
    :id,
    :address_line_one,
    :address_line_two,
    :address_city,
    :address_state,
    :address_zip,
    :customer,
    :line_items,
    :total_price,
  ]

  ATTRIBUTE_TYPES = {
    id: Field::String,
    address_line_one: Field::String,
    address_line_two: Field::String,
    address_city: Field::String,
    address_state: Field::String,
    address_zip: Field::String,
    customer: Field::BelongsTo,
    line_items: Field::HasMany,
    total_price: Field::String,
  }

  TABLE_ATTRIBUTES = ATTRIBUTES
  FORM_ATTRIBUTES = ATTRIBUTES - [:id, :total_price]
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES
end
