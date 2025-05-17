require "rails_helper"

describe OrderDashboard do
  describe "#permitted_attributes" do
    it "returns the attribute name by default" do
      dashboard = OrderDashboard.new

      expect(dashboard.permitted_attributes).to include(:address_line_one)
    end

    context "when the page context is 'new' or 'create'" do
      let(:ctx_with_non_admin_user) do
        Struct.new(:pundit_user).new(Struct.new(:admin?).new(false))
      end
      let(:ctx_with_admin_user) do
        Struct.new(:pundit_user).new(Struct.new(:admin?).new(true))
      end

      context "when the user is not an admin" do
        it "not returns attributes with customer_id" do
          dashboard = OrderDashboard.new
          dashboard.context = ctx_with_non_admin_user
          expect(
            dashboard.permitted_attributes("new")
          ).not_to include("customer_id")
          expect(
            dashboard.permitted_attributes("create")
          ).not_to include("customer_id")
        end
      end

      context "when the user is an admin" do
        it "returns attributes with customer_id" do
          dashboard = OrderDashboard.new
          dashboard.context = ctx_with_admin_user
          expect(
            dashboard.permitted_attributes("new")
          ).to include("customer_id")
          expect(
            dashboard.permitted_attributes("create")
          ).to include("customer_id")
        end
      end
    end

    context "when the page context is 'edit' or 'update'" do
      let(:ctx_with_non_admin_user) do
        Struct.new(:pundit_user).new(Struct.new(:admin?).new(false))
      end
      let(:ctx_with_admin_user) do
        Struct.new(:pundit_user).new(Struct.new(:admin?).new(true))
      end

      context "when the user is not an admin" do
        it "not returns attributes with customer_id" do
          dashboard = OrderDashboard.new
          dashboard.context = ctx_with_non_admin_user
          expect(
            dashboard.permitted_attributes("edit")
          ).not_to include("customer_id")
          expect(
            dashboard.permitted_attributes("update")
          ).not_to include("customer_id")
        end
      end

      context "when the user is an admin" do
        it "also no returns attributes with customer_id" do
          dashboard = OrderDashboard.new
          dashboard.context = ctx_with_admin_user
          expect(
            dashboard.permitted_attributes("edit")
          ).not_to include("customer_id")
          expect(
            dashboard.permitted_attributes("update")
          ).not_to include("customer_id")
        end
      end
    end
  end
end
