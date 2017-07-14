require "administrate/base_dashboard"

class SeriesDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    name: Field::String,
  }.freeze

  COLLECTION_ATTRIBUTES = %i(id name).freeze

  SHOW_PAGE_ATTRIBUTES = %i(id name).freeze

  FORM_ATTRIBUTES = [
    :name,
  ].freeze
end
