class CustomerDashboard
  include ActionView::Helpers::UrlHelper

  def title_attribute
    :name
  end

  def attribute_adapters
    {
      email: :email,
      lifetime_value: :string,
      name: :string,
    }
  end

  def index_page_attributes
    attributes
  end

  def show_page_attributes
    attributes - [title_attribute]
  end

  def form_attributes
    [
      :name,
      :email,
    ]
  end

  private

  def attributes
    [
      :name,
      :email,
      :lifetime_value,
    ]
  end
end
