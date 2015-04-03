class CustomerDashboard
  include ActionView::Helpers::UrlHelper

  def title_attribute
    :name
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
