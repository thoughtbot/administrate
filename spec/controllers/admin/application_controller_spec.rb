require "rails_helper"

RSpec.describe Admin::ApplicationController, type: :controller do
  describe "redirections after actions" do
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
      params = order_attributes.except(
        "id",
        "created_at",
        "updated_at",
        "shipped_at",
      )

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

  describe "creation yeilds resource" do
    controller(Admin::OrdersController) do
      attr_reader :resource

      def create
        super do |resource|
          @resource = resource
        end
      end
    end

    it "yields the created resource after creation" do
      customer = create(:customer)
      order_attributes = build(:order, customer: customer).attributes
      params = order_attributes.except(
        "id",
        "created_at",
        "updated_at",
        "shipped_at",
      )

      post :create, params: { order: params }

      expect(controller.resource).to be_a(Order)
    end
  end

  describe "authorization" do
    controller(Administrate::ApplicationController) do
      def resource_class
        Order
      end

      def dashboard
        OrderDashboard
      end

      def authorized_action?(resource, _action)
        resource.address_zip == "666"
      end
    end

    it "authorizes allowed actions" do
      resource = FactoryBot.create(:order, address_zip: "666")
      expect { get :show, params: { id: resource.id } }.
        not_to raise_error
    end

    it "does not authorize disallowed actions" do
      resource = FactoryBot.create(:order, address_zip: "667")
      expect { get :show, params: { id: resource.id } }.
        to raise_error(Administrate::NotAuthorizedError)
    end
  end

  describe "deprecated methods: show_action" do
    controller(Administrate::ApplicationController) do
      def index
        show_action?(:index, Order)
      end
    end

    it "triggers a deprecation warning" do
      allow(Administrate.deprecator).to receive(:warn)
      get :index
      expect(Administrate.deprecator).to(
        have_received(:warn).
          with(/`show_action\?` is deprecated/),
      )
    end
  end

  describe "deprecated methods: valid_action" do
    controller(Administrate::ApplicationController) do
      def index
        valid_action?(:index, Order)
      end
    end

    it "triggers a deprecation warning" do
      allow(Administrate.deprecator).to receive(:warn)
      get :index
      expect(Administrate.deprecator).to(
        have_received(:warn).
          with(/`valid_action\?` is deprecated/),
      )
    end
  end
end
