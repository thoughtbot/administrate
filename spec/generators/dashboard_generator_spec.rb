require "rails_helper"
require "generators/administrate/dashboard/dashboard_generator"

describe Administrate::Generators::DashboardGenerator, :generator do
  describe "dashboard definition file" do
    it "has valid syntax" do
      dashboard = file("app/dashboards/customer_dashboard.rb")

      run_generator ["customer"]

      expect(dashboard).to exist
      expect(dashboard).to have_correct_syntax
    end

    it "includes standard model attributes" do
      dashboard = file("app/dashboards/customer_dashboard.rb")

      run_generator ["customer"]

      expect(dashboard).to contain("id: :integer,")
      expect(dashboard).to contain("created_at: :datetime,")
      expect(dashboard).to contain("updated_at: :datetime,")
    end

    it "includes user-defined database columns" do
      dashboard = file("app/dashboards/customer_dashboard.rb")

      run_generator ["customer"]

      expect(dashboard).to contain("name: :string,")
      expect(dashboard).to contain("email: :string,")
    end

    it "includes has_many relationships" do
      dashboard = file("app/dashboards/customer_dashboard.rb")

      run_generator ["customer"]

      expect(dashboard).to contain("orders: :has_many")
    end

    it "includes belongs_to relationships" do
      dashboard = file("app/dashboards/order_dashboard.rb")

      run_generator ["order"]

      expect(dashboard).to contain("customer: :belongs_to")
    end
  end

  describe "resource controller" do
    it "has valid syntax" do
      controller = file("app/controllers/admin/customers_controller.rb")

      run_generator ["customer"]

      expect(controller).to exist
      expect(controller).to have_correct_syntax
    end

    it "subclasses Admin::ApplicationController" do
      controller = file("app/controllers/admin/customers_controller.rb")

      run_generator ["customer"]

      expect(controller).to contain(
        "class Admin::CustomersController < Admin::ApplicationController"
      )
    end
  end
end
