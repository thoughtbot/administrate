class ProductDashboard
  def attribute_adapters
    {
      description: :string,
      image_url: :string,
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
