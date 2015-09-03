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
    quantity: Field::Number.with_options(decimals: 0),
    total_price: Field::Number.with_options(prefix: "$"),
    unit_price: Field::Number.with_options(prefix: "$"),
  }

  TABLE_ATTRIBUTES = ATTRIBUTES + [:total_price]
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES + [:total_price]
  FORM_ATTRIBUTES = ATTRIBUTES
end
