require "administrate/base_dashboard"

class HostDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    name: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime
  }.freeze

  COLLECTION_ATTRIBUTES = %i[
    id
    name
    created_at
    updated_at
  ].freeze

  SHOW_PAGE_ATTRIBUTES = %i[
    id
    name
    created_at
    updated_at
  ].freeze

  FORM_ATTRIBUTES = %i[
    name
  ].freeze

  COLLECTION_FILTERS = {}.freeze
end
