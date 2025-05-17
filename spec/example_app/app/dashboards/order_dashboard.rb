require "administrate/base_dashboard"

class OrderDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    id: Field::Number.with_options(searchable: true),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    address_line_one: Field::String,
    address_line_two: Field::String,
    address_city: Field::String,
    address_state: Field::String,
    address_zip: Field::String,
    full_address: Field::String.with_options(
      getter: ->(field) {
        r = field.resource
        [
          r.address_line_one,
          r.address_line_two,
          r.address_city,
          r.address_state,
          r.address_zip
        ].compact.join("\n")
      },
      sorting_column: :address_zip
    ),
    customer: Field::BelongsTo.with_options(order: "name"),
    line_items: Field::HasMany.with_options(
      collection_attributes: %i[product quantity unit_price total_price]
    ),
    total_price: Field::Number.with_options(prefix: "$", decimals: 2, sortable: false),
    shipped_at: Field::DateTime,
    payments: Field::HasMany
  }

  READ_ONLY_ATTRIBUTES = [
    :id,
    :total_price,
    :created_at,
    :updated_at
  ]

  COLLECTION_ATTRIBUTES = [
    :id,
    :customer,
    :full_address,
    :total_price,
    :line_items,
    :shipped_at
  ]

  FORM_ATTRIBUTES = {
    "" => %i[customer],
    "details" => %i[
      line_items
      shipped_at
      payments
    ],
    "address" => %i[
      address_line_one
      address_line_two
      address_city
      address_state
      address_zip
    ]
  }.freeze
  SHOW_PAGE_ATTRIBUTES = FORM_ATTRIBUTES
    .except("address")
    .merge(
      "" => %i[customer full_address created_at updated_at],
      "details" => %i[line_items total_price shipped_at payments]
    )
    .freeze

  def form_attributes(action = nil)
    if %w[new create].include?(action.to_s) && context.try(:pundit_user).try(:admin?)
      super
    else
      super.dup.tap { |attrs| attrs[""] = attrs[""] - %i[customer] }.delete_if { |_k, v| v.blank? }
    end
  end
end
