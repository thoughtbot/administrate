require "base_dashboard"

class ProductDashboard < BaseDashboard
  def attribute_types
    {
      description: :string,
      image_url: :image,
      name: :string,
      price: :string,
    }
  end

  def index_page_attributes
    attributes
  end

  def form_attributes
    attributes
  end

  def show_page_attributes
    attributes
  end

  private

  def attributes
    [
      :name,
      :price,
      :description,
      :image_url,
    ]
  end
end
