require "administrate/base_dashboard"

class ProductDashboard < Administrate::BaseDashboard
  ATTRIBUTES = [
    :name,
    :pages,
    :price,
    :description,
    :image_url,
    :product_meta_tag,
    :product_meta_title,
    :release_year,
  ]

  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    description: Field::Text,
    image_url: Field::Url,
    name: Field::String,
    pages: Field::HasMany,
    price: Field::Number.with_options(prefix: "$", decimals: 2),
    product_meta_tag: Field::HasOne,
    product_meta_title: Field::String,
    release_year: Field::Select.with_options(
      collection: -> { (Time.current.year - 10)..Time.current.year },
    ),
  }

  COLLECTION_ATTRIBUTES = ATTRIBUTES - %i{product_meta_tag}
  FORM_ATTRIBUTES = ATTRIBUTES - %i{product_meta_title}
  SHOW_PAGE_ATTRIBUTES = FORM_ATTRIBUTES

  def display_resource(resource)
    resource.name
  end
end
