require "rails_helper"

RSpec.describe Admin::PaymentsController, type: :controller do
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
