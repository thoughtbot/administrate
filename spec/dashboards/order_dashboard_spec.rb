require "rails_helper"

describe OrderDashboard do
  describe "#permitted_attributes" do
    let(:ctx_with_non_admin_user) do
      Struct.new(:pundit_user).new(Struct.new(:admin?).new(false))
    end

    let(:ctx_with_admin_user) do
      Struct.new(:pundit_user).new(Struct.new(:admin?).new(true))
    end

    it "returns the attribute name by default" do
      dashboard = OrderDashboard.new

      expect(dashboard.permitted_attributes).to include(:address_line_one)
    end

    it "does not include customer_id for non-admins on new/create" do
      dashboard = OrderDashboard.new
      dashboard.context = ctx_with_non_admin_user

      expect(dashboard.permitted_attributes("new")).not_to include("customer_id")
      expect(dashboard.permitted_attributes("create")).not_to include("customer_id")
    end

    it "includes customer_id for admins on new/create" do
      dashboard = OrderDashboard.new
      dashboard.context = ctx_with_admin_user

      expect(dashboard.permitted_attributes("new")).to include("customer_id")
      expect(dashboard.permitted_attributes("create")).to include("customer_id")
    end

    it "does not include customer_id for non-admins on edit/update" do
      dashboard = OrderDashboard.new
      dashboard.context = ctx_with_non_admin_user

      expect(dashboard.permitted_attributes("edit")).not_to include("customer_id")
      expect(dashboard.permitted_attributes("update")).not_to include("customer_id")
    end

    it "does not include customer_id for admins on edit/update" do
      dashboard = OrderDashboard.new
      dashboard.context = ctx_with_admin_user

      expect(dashboard.permitted_attributes("edit")).not_to include("customer_id")
      expect(dashboard.permitted_attributes("update")).not_to include("customer_id")
    end
  end
end
