require "base_dashboard"

class CustomerDashboard < BaseDashboard
  def attribute_types
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
    attributes - [:name]
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
