require "administrate/base_dashboard"

class PageDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    product: Field::BelongsTo.with_options(look: :product_card),
    id: Field::Number,
    title: Field::String,
    body: Field::Text,
    created_at: Field::DateTime,
    updated_at: Field::DateTime
  }.freeze

  COLLECTION_ATTRIBUTES = %i[
    id
    product
    title
  ].freeze

  SHOW_PAGE_ATTRIBUTES = %i[
    product
    id
    title
    body
    created_at
    updated_at
  ].freeze

  FORM_ATTRIBUTES = %i[
    product
    title
    body
  ].freeze

  COLLECTION_FILTERS = {}.freeze
end
