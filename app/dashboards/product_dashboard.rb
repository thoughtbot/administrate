require "administrate/base_dashboard"

class ProductDashboard < Administrate::BaseDashboard
  def attribute_types
    {
      description: Field::String,
      image_url: Field::Image,
      name: Field::String,
      price: Field::String,
    }
  end

  def table_attributes
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
