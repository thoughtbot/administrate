require "rails_helper"

# Test Authorization by using the Pundit concern and an example policy,
# which will test all the authorization functionality.

describe Admin::OrdersController, type: :controller do
  context "with Punditize concern" do
    controller(Admin::OrdersController) do
      include Administrate::Punditize
      def pundit_user
        Customer.find_by(name: "Current User")
      end
    end

    let!(:user) { create(:customer, name: "Current User") }

    describe "GET index" do
      it "shows only your own orders" do
        someone = create(:customer)
        order1 = create(:order, customer: user)
        _order2 = create(:order, customer: someone)
        order3 = create(:order, customer: user)

        locals = capture_view_locals { get :index }

        expect(locals[:resources]).to contain_exactly(order1, order3)
      end
    end

    describe "GET new" do
      it "raises a Pundit error" do
        expect { get :new }.to raise_error(Pundit::NotAuthorizedError)
      end
    end

    describe "GET edit" do
      it "allows me to edit my records" do
        order = create :order, customer: user
        expect { get :edit, params: { id: order.id } }.not_to raise_error
      end

      it "does not allow me to see other users' records" do
        other_user = create(:customer)
        order = create(:order, customer: other_user)
        expect { get :show, params: { id: order.id } }.
          to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    describe "PUT update" do
      def send_request(order:)
        put(
          :update,
          params: {
            id: order.id,
            order: { address_line_one: "22 Acacia Avenue" },
          },
        )
      end

      it "allows me to update my records" do
        order = create(:order, customer: user)
        send_request(order: order)
        expect(response).to redirect_to([:admin, order])
        expect(order.reload.address_line_one).to eq("22 Acacia Avenue")
      end

      it "does not allow me to update other users' records" do
        other_user = create(:customer)
        order = create(:order, customer: other_user)
        expect do
          send_request(order: order)
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    describe "DELETE destroy" do
      it "never allows me to delete a record" do
        o = create :order, customer: user, address_state: "AZ"
        expect { delete :destroy, params: { id: o.id } }.
          to raise_error(Pundit::NotAuthorizedError)
      end
    end

    describe "#show_action?" do
      it "shows edit actions for records by the user" do
        o = create(:order, customer: user)
        expect(controller.show_action?(:edit, o)).to be true
      end

      it "does not show edit actions for records from other users" do
        someone = create(:customer)
        o = create(:order, customer: someone)
        expect(controller.show_action?(:edit, o)).to be false
      end

      it "never shows destroy actions" do
        o = create :order, customer: user, address_state: "AZ"
        expect(controller.show_action?(:destroy, o)).to be false
      end
    end
  end
end
