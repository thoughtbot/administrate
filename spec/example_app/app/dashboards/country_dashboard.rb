require "administrate/base_dashboard"

class CountryDashboard < Administrate::BaseDashboard
  ATTRIBUTES = %i(code name).freeze

  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    code: Field::String,
    name: Field::String,
  }.freeze

  COLLECTION_ATTRIBUTES = ATTRIBUTES
  FORM_ATTRIBUTES = ATTRIBUTES
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES

  def display_resource(resource)
    resource.name
  end
end
