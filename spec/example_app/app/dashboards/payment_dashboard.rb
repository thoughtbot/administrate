require "administrate/base_dashboard"

class PaymentDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    order: Field::BelongsTo,
  }

  COLLECTION_ATTRIBUTES = [
    :id,
  ]

  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys
end
