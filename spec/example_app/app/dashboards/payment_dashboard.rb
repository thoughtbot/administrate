require "administrate/base_dashboard"

class PaymentDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    order: Field::BelongsTo.with_options(primary_key: :code),
  }

  COLLECTION_ATTRIBUTES = [
    :id,
  ]

  FORM_ATTRIBUTES = ATTRIBUTE_TYPES.keys

  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys
end
