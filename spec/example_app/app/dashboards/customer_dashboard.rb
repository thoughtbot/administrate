require "administrate/base_dashboard"

class CustomerDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    email: Field::Email,
    email_subscriber: Field::Boolean,
    lifetime_value: Field::Number.with_options(prefix: "$", decimals: 2, sortable: false),
    name: Field::String,
    orders: Field::HasMany.with_options(limit: 2, sort_by: :id),
    log_entries: HasManyVariantField.with_options(limit: 2, sort_by: :id),
    updated_at: Field::DateTime,
    kind: Field::Select,
    territory: Field::BelongsTo.with_options(
      searchable: true,
      searchable_fields: ["name"],
      include_blank: true
    ),
    example_time: Field::Time,
    password: Field::Password
  }

  COLLECTION_ATTRIBUTES = [
    :name,
    :email,
    :email_subscriber,
    :orders,
    :territory,
    :example_time
  ]

  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys - [:name]

  FORM_ATTRIBUTES = [
    :name,
    :email,
    :email_subscriber,
    :kind,
    :territory,
    :example_time,
    :password
  ].freeze

  COLLECTION_FILTERS = {
    vip: ->(resources) { resources.where(kind: :vip) },
    kind: ->(resources, arg) { resources.where(kind: arg) }
  }.freeze

  def display_resource(customer)
    customer.name
  end
end
