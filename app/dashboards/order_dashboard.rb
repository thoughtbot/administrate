require "administrate/base_dashboard"

class OrderDashboard < Administrate::BaseDashboard
  def attribute_types
    {
      id: :string,
      address_line_one: :string,
      address_line_two: :string,
      address_city: :string,
      address_state: :string,
      address_zip: :string,
      customer: :belongs_to,
      line_items: :has_many,
      total_price: :string,
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
