require "administrate/base_dashboard"

class Catalog::ProductDashboard < Administrate::BaseDashboard
  ATTRIBUTES = [
    :name,
    :price,
    :description,
    :image_url,
  ]

  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    description: Field::Text,
    image_url: Field::Image,
    name: Field::String,
    price: Field::Number.with_options(prefix: "$", decimals: 2),
  }

  COLLECTION_ATTRIBUTES = ATTRIBUTES
  FORM_ATTRIBUTES = ATTRIBUTES
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES

  def display_resource(resource)
    resource.name
  end
end
