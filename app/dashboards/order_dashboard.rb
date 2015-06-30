require "administrate/base_dashboard"

class OrderDashboard < Administrate::BaseDashboard
  def attribute_types
    {
      id: Field::String,
      address_line_one: Field::String,
      address_line_two: Field::String,
      address_city: Field::String,
      address_state: Field::String,
      address_zip: Field::String,
      customer: Field::BelongsTo,
      line_items: Field::HasMany,
      total_price: Field::String,
    }
  end

  def table_attributes
    attributes
  end

  def form_attributes
    attributes - [:id, :total_price]
  end

  def show_page_attributes
    attributes
  end

  private

  def attributes
    [
      :id,
      :address_line_one,
      :address_line_two,
      :address_city,
      :address_state,
      :address_zip,
      :customer,
      :line_items,
      :total_price,
    ]
  end
end
