require "administrate/field/has_many_variant"
require "administrate/base_dashboard"

class CustomerDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    email: Field::Email,
    email_subscriber: Field::Boolean,
    lifetime_value: Field::Number.with_options(prefix: "$", decimals: 2),
    name: Field::String,
    orders: Field::HasMany.with_options(limit: 2, sort_by: :id),
    log_entries: Field::HasManyVariant.with_options(limit: 2, sort_by: :id),
    updated_at: Field::DateTime,
    kind: Field::Select.with_options(collection: Customer::KINDS),
    territory: Field::BelongsTo.with_options(
      searchable: true,
      searchable_fields: ["name"],
      include_blank: true,
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
    :territory,
    :password,
  ].freeze

  COLLECTION_FILTERS = {
    vip: ->(resources) { resources.where(kind: :vip) },
    kind: ->(resources, arg) { resources.where(kind: arg) },
  }.freeze

  def display_resource(customer)
    customer.name
  end
end
