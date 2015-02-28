class CustomerDashboard
  include ActionView::Helpers::UrlHelper

  def title_attribute
    :name
  end

  def index_attributes
    [
      :name,
      :email,
    ]
  end
end
