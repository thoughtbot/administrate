require "administrate/base_dashboard"

class CustomerDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    email: Field::Email,
    email_subscriber: Field::Boolean,
    lifetime_value: Field::Number.with_options(prefix: "$", decimals: 2),
    name: Field::String,
    orders: Field::HasMany.with_options(limit: 2),
    updated_at: Field::DateTime,
    kind: Field::Select.with_options(collection: Customer::KINDS),
    birth_date: Field::Date,
    birth_time: Field::Time,
  }

  COLLECTION_ATTRIBUTES = ATTRIBUTE_TYPES.keys
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys - [:name]
  FORM_ATTRIBUTES = [
    :name,
    :email,
    :email_subscriber,
    :kind,
    :birth_date,
    :birth_time,
  ].freeze

  def display_resource(customer)
    customer.name
  end
end
