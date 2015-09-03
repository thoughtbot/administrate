require "administrate/base_dashboard"

class CustomerDashboard < Administrate::BaseDashboard
  ATTRIBUTES = [
    :name,
    :email,
    :lifetime_value,
    :orders,
    :created_at,
    :updated_at,
  ]

  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    email: Field::Email,
    lifetime_value: Field::Number.with_options(prefix: "$", decimals: 2),
    name: Field::String,
    orders: Field::HasMany,
    updated_at: Field::DateTime,
  }

  TABLE_ATTRIBUTES = ATTRIBUTES
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES - [:name]
  FORM_ATTRIBUTES = [:name, :email]
end
