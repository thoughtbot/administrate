require "base_dashboard"

class LineItemDashboard < BaseDashboard
  def index_page_attributes
    attributes + [:total_price]
  end

  def show_page_attributes
    attributes + [:total_price]
  end

  def form_attributes
    attributes
  end

  def attribute_adapters
    {
      order: :belongs_to,
      product: :belongs_to,
      quantity: :string,
      total_price: :string,
      unit_price: :string,
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
