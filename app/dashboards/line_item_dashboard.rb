require "administrate/base_dashboard"

class LineItemDashboard < Administrate::BaseDashboard
  ATTRIBUTES = [
    :order,
    :product,
    :quantity,
    :unit_price,
  ]

  ATTRIBUTE_TYPES = {
    order: Field::BelongsTo,
    product: Field::BelongsTo,
    quantity: Field::String,
    total_price: Field::String,
    unit_price: Field::String,
  }

  TABLE_ATTRIBUTES = ATTRIBUTES + [:total_price]
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES + [:total_price]
  FORM_ATTRIBUTES = ATTRIBUTES
end
