require "administrate/base_dashboard"

class CustomerDashboard < Administrate::BaseDashboard
  def attribute_types
    {
      created_at: :datetime,
      email: :email,
      lifetime_value: :currency,
      name: :string,
      orders: :has_many,
      updated_at: :datetime,
    }
  end

  def table_attributes
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
      :orders,
      :created_at,
      :updated_at,
    ]
  end
end
