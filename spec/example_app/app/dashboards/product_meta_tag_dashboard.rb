require "administrate/base_dashboard"

class ProductMetaTagDashboard < Administrate::BaseDashboard
  ATTRIBUTES = [
    :meta_title,
    :meta_description
  ].freeze

  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    meta_title: Field::String,
    meta_description: Field::String,
  }.freeze

  COLLECTION_ATTRIBUTES = ATTRIBUTES
  FORM_ATTRIBUTES = ATTRIBUTES
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES
end
