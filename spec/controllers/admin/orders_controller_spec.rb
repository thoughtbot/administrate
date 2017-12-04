require "rails_helper"

# Test Authorization by using the Pundit concern and an example policy,
# which will test all the authorization functionality.

describe Admin::OrdersController, type: :controller do
  context "with Punditize concern" do
    controller(Admin::OrdersController) do
      include Administrate::Punditize
      def pundit_user
        Customer.first # assume the user is the first Customer
      end
    end

    let!(:user) { create :customer }

    before(:each) do
      # Create a few orders for the user and a few for other customers
      create_list :order, 4, customer: create(:customer)
      create_list :order, 7, customer: user
      create_list :order, 2, customer: create(:customer)
      create_list :order, 2, customer: user
    end

    # Policies are defined in order_policy.rb
    describe "GET index" do
      it "shows only the records in the admin scope" do
        locals = capture_view_locals { get :index }
        expect(locals[:resources].count).to eq(9) # only my orders
      end
    end

    describe "GET new" do
      it "raises a Pundit error" do
        expect { get :new }.to raise_error(Pundit::NotAuthorizedError)
      end
    end

    describe "GET edit" do
      it "allows me to edit records in Arizona" do
        az = create :order, customer: user, address_state: "AZ"
        expect { get :edit, id: az.id }.not_to raise_error
      end

      it "does not allow me to edit other records" do
        ga = create :order, customer: user, address_state: "GA"
        expect { get :edit, id: ga.id }.
          to raise_error(Pundit::NotAuthorizedError)
      end
    end

    describe "DELETE destroy" do
      it "never allows me to delete a record" do
        o = create :order, customer: user, address_state: "AZ"
        expect { delete :destroy, id: o.id }.
          to raise_error(Pundit::NotAuthorizedError)
      end
    end

    describe "#show_action?" do
      it "shows edit actions for records in AZ" do
        o = create :order, customer: user, address_state: "AZ"
        expect(controller.show_action?(:edit, o)).to be true
      end

      it "does not show edit actions for records elsewhere" do
        o = create :order, customer: user, address_state: "GA"
        expect(controller.show_action?(:edit, o)).to be false
      end

      it "never shows destroy actions" do
        o = create :order, customer: user, address_state: "AZ"
        expect(controller.show_action?(:destroy, o)).to be false
      end
    end
  end
end
