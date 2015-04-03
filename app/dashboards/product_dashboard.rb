class ProductDashboard
  def index_page_attributes
    [
      :name,
      :price,
      :description,
      :image_url,
    ]
  end

  def title_attribute
    :name
  end

  def form_attributes
    [
      :name,
      :price,
      :description,
      :image_url,
    ]
  end

  def show_page_attributes
    [
      :name,
      :price,
      :description,
      :image_url,
    ]
  end
end
