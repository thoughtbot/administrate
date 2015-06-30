require "administrate/base_dashboard"

class CustomerDashboard < Administrate::BaseDashboard
  def attribute_types
    {
      created_at: Field::String,
      email: Field::Email,
      lifetime_value: Field::String,
      name: Field::String,
      orders: Field::HasMany,
      updated_at: Field::String,
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
