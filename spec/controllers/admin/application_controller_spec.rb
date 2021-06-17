require "rails_helper"

RSpec.describe Admin::OrdersController, type: :controller do
  controller(Admin::OrdersController) do
    def after_resource_destroyed_path(_requested_resource)
      { action: :index, controller: :customers }
    end

    def after_resource_created_path(requested_resource)
      [namespace, requested_resource.customer]
    end

    def after_resource_updated_path(requested_resource)
      [namespace, requested_resource.customer]
    end
  end

  it "redirect to custom route after destroy" do
    order = create(:order)

    delete :destroy, params: { id: order.to_param }
    expect(response).to redirect_to(admin_customers_path)
  end

  it "redirect to custom route after create" do
    customer = create(:customer)
    order_attributes = build(:order, customer: customer).attributes
    params = order_attributes.except("id", "created_at", "updated_at", "shipped_at")

    post :create, params: { order: params }
    expect(response).to redirect_to(admin_customer_path(customer))
  end

  it "redirect to custom route after update" do
    order = create(:order)
    order_params = { address_line_one: order.address_line_one }

    put :update, params: { id: order.to_param, order: order_params }
    expect(response).to redirect_to(admin_customer_path(order.customer))
  end
end
