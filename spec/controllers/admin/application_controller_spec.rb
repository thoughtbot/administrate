require "rails_helper"

RSpec.describe Admin::ApplicationController, type: :controller do
  describe "redirections after actions" do
    controller(Admin::OrdersController) do
      def after_resource_destroyed_path(_requested_resource)
        {action: :index, controller: :customers}
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

      delete :destroy, params: {id: order.to_param}
      expect(response).to redirect_to(admin_customers_path)
    end

    it "redirect to custom route after create" do
      customer = create(:customer)
      order_attributes = build(:order, customer: customer).attributes
      params = order_attributes.except(
        "id",
        "created_at",
        "updated_at",
        "shipped_at"
      )

      post :create, params: {order: params}
      expect(response).to redirect_to(admin_customer_path(customer))
    end

    it "redirect to custom route after update" do
      order = create(:order)
      order_params = {address_line_one: order.address_line_one}

      put :update, params: {id: order.to_param, order: order_params}
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
        "shipped_at"
      )

      post :create, params: {order: params}

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
      expect { get :show, params: {id: resource.id} }
        .not_to raise_error
    end

    it "does not authorize disallowed actions" do
      resource = FactoryBot.create(:order, address_zip: "667")
      expect { get :show, params: {id: resource.id} }
        .to raise_error(Administrate::NotAuthorizedError)
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
        have_received(:warn)
          .with(/`show_action\?` is deprecated/)
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
        have_received(:warn)
          .with(/`valid_action\?` is deprecated/)
      )
    end
  end

  describe "Authorization flow" do
    controller(Administrate::ApplicationController) do
      def resource_resolver
        @resource_resolver ||=
          Administrate::ResourceResolver.new("admin/orders")
      end
    end

    before do
      allow(controller).to receive(:find_resource).and_call_original
      allow(controller).to receive(:authorize_scope).and_call_original
      allow(controller).to receive(:scoped_resource).with(no_args).and_call_original
      allow(controller).to receive(:authorize_resource).and_call_original
      allow(controller).to receive(:contextualize_resource).and_call_original
      allow(controller).to receive(:after_resource_destroyed_path).with(any_args).and_return(controller.controller_path)
    end

    context "on index" do
      it "passes all necessary authorization methods" do
        get :index, params: {}
        expect(controller).not_to have_received(:find_resource)
        expect(controller).to have_received(:authorize_scope)
        expect(controller).to have_received(:scoped_resource)
        expect(controller).not_to have_received(:authorize_resource)
        expect(controller).not_to have_received(:contextualize_resource)
      end
    end

    context "on new" do
      it "passes all necessary authorization methods" do
        get :new, params: {}
        expect(controller).not_to have_received(:find_resource)
        expect(controller).not_to have_received(:authorize_scope)
        expect(controller).not_to have_received(:scoped_resource)
        expect(controller).to have_received(:authorize_resource)
        expect(controller).to have_received(:contextualize_resource)
      end
    end

    context "on create" do
      it "passes all necessary authorization methods" do
        params = attributes_for(:order)
        post :create, params: {order: params}
        expect(controller).not_to have_received(:find_resource)
        expect(controller).not_to have_received(:authorize_scope)
        expect(controller).not_to have_received(:scoped_resource)
        expect(controller).to have_received(:authorize_resource)
        expect(controller).to have_received(:contextualize_resource)
      end
    end

    context "on show" do
      it "passes all necessary authorization methods" do
        order = create(:order)
        get :show, params: {id: order.to_param}
        expect(controller).to have_received(:find_resource)
        expect(controller).to have_received(:authorize_scope)
        expect(controller).to have_received(:scoped_resource)
        expect(controller).to have_received(:authorize_resource)
        expect(controller).to have_received(:contextualize_resource)
      end
    end

    context "on edit" do
      it "passes all necessary authorization methods" do
        order = create(:order)
        get :edit, params: {id: order.to_param}
        expect(controller).to have_received(:find_resource)
        expect(controller).to have_received(:authorize_scope)
        expect(controller).to have_received(:scoped_resource)
        expect(controller).to have_received(:authorize_resource)
        expect(controller).to have_received(:contextualize_resource)
      end
    end

    context "on update" do
      it "passes all necessary authorization methods" do
        order = create(:order)
        put :update, params: {id: order.to_param, order: {address_zip: "666"}}
        expect(controller).to have_received(:find_resource)
        expect(controller).to have_received(:authorize_scope)
        expect(controller).to have_received(:scoped_resource)
        expect(controller).to have_received(:authorize_resource)
        expect(controller).to have_received(:contextualize_resource)
      end
    end

    context "on destroy" do
      it "passes all necessary authorization methods" do
        order = create(:order)
        delete :destroy, params: {id: order.to_param}
        expect(controller).to have_received(:find_resource)
        expect(controller).to have_received(:authorize_scope)
        expect(controller).to have_received(:scoped_resource)
        expect(controller).to have_received(:authorize_resource)
        expect(controller).to have_received(:contextualize_resource)
      end
    end
  end

  describe "validation contexts" do
    render_views
    controller(Admin::ProductsController) do
      def validation_contexts_on_create(resource)
        super + [:some_unclear_situation]
      end

      def validation_contexts_on_update(resource)
        super + [:some_unclear_situation]
      end
    end

    context "on create" do
      it "raise a validation error due to custom validation context" do
        params = attributes_for(:product)
        post :create, params: {product: params}

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("Product meta tag can&#39;t be blank")
      end
    end

    context "on update" do
      it "raise a validation error due to custom validation context" do
        product = create(:product, product_meta_tag: nil)
        params = {name: "New Name"}
        put :update, params: {id: product.to_param, product: params}

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("Product meta tag can&#39;t be blank")
      end
    end
  end
end
