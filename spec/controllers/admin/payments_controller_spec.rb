require "rails_helper"

RSpec.describe Admin::PaymentsController, type: :controller do
  context "without a policy namespace" do
    controller(Admin::PaymentsController) do
      include Administrate::Punditize

      def pundit_user
        Customer.find_by(name: "Current User")
      end
    end

    let!(:user) { create(:customer, name: "Current User") }

    describe "GET new" do
      it "raises a Pundit error" do
        expect { get :new }.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end

  context "with a policy namespace" do
    controller(Admin::PaymentsController) do
      include Administrate::Punditize

      def policy_namespace
        [:own]
      end

      def pundit_user
        Customer.find_by(name: "Current User")
      end
    end

    let!(:user) { create(:customer, name: "Current User") }

    before do
      stub_const(
        "Own::PaymentPolicy",
        Class.new(PaymentPolicy) do
          def create?
            true
          end
        end
      )
    end

    describe "GET new" do
      it "allows access to /new when the namespaced policy permits it" do
        expect { get :new }.not_to raise_error
      end
    end
  end
end
