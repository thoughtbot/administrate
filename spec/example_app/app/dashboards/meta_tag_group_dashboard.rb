require "administrate/base_dashboard"

class MetaTagGroupDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    product_meta_tags: Field::HasMany,
    id: Field::Number,
    name: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  COLLECTION_ATTRIBUTES = %i[
    product_meta_tags
    id
    name
    created_at
  ].freeze

  SHOW_PAGE_ATTRIBUTES = %i[
    product_meta_tags
    id
    name
    created_at
    updated_at
  ].freeze

  FORM_ATTRIBUTES = %i[
    product_meta_tags
    name
  ].freeze

  COLLECTION_FILTERS = {}.freeze
end
