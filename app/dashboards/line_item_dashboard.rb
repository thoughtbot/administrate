require "administrate/base_dashboard"

class LineItemDashboard < Administrate::BaseDashboard
  def table_attributes
    attributes + [:total_price]
  end

  def show_page_attributes
    attributes + [:total_price]
  end

  def form_attributes
    attributes
  end

  def attribute_types
    {
      order: :belongs_to,
      product: :belongs_to,
      quantity: :string,
      total_price: :currency,
      unit_price: :currency,
    }
  end

  private

  def attributes
    [
      :order,
      :product,
      :quantity,
      :unit_price,
    ]
  end
end
