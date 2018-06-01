require "administrate/base_dashboard"

class CustomerDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    email: Field::Email,
    email_subscriber: Field::Boolean,
    lifetime_value: Field::Number.with_options(prefix: "$", decimals: 2),
    name: Field::String,
    orders: Field::HasMany.with_options(limit: 2, sort_by: :id),
    log_entries: Field::HasMany.with_options(limit: 2, sort_by: :id),
    updated_at: Field::DateTime,
    kind: Field::Select.with_options(collection: Customer::KINDS),
    country: Field::BelongsTo.with_options(
      primary_key: :code,
      foreign_key: :country_code,
      searchable: true,
      searchable_field: "name",
    ),
    password: Field::Password,
  }

  COLLECTION_ATTRIBUTES = ATTRIBUTE_TYPES.keys - %i[created_at updated_at]
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys - [:name]
  FORM_ATTRIBUTES = [
    :name,
    :email,
    :email_subscriber,
    :kind,
    :country,
    :password,
  ].freeze

  def display_resource(customer)
    customer.name
  end
end
