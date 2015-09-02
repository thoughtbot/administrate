require "administrate/base_dashboard"

class ProductDashboard < Administrate::BaseDashboard
  ATTRIBUTES = [
    :name,
    :price,
    :description,
    :image_url,
  ]

  ATTRIBUTE_TYPES = {
    description: Field::String,
    image_url: Field::Image,
    name: Field::String,
    price: Field::Number.with_options(prefix: "$"),
  }

  TABLE_ATTRIBUTES = ATTRIBUTES
  FORM_ATTRIBUTES = ATTRIBUTES
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES
end
