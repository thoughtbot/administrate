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

    describe "#attribute_types" do
      it "includes standard model attributes" do
        dashboard = file("app/dashboards/customer_dashboard.rb")

        run_generator ["customer"]

        expect(dashboard).to contain("id: Field::String,")
        expect(dashboard).to contain("created_at: Field::String,")
        expect(dashboard).to contain("updated_at: Field::String,")
      end

      it "includes user-defined database columns" do
        dashboard = file("app/dashboards/customer_dashboard.rb")

        run_generator ["customer"]

        expect(dashboard).to contain("name: Field::String,")
        expect(dashboard).to contain("email: Field::String,")
      end

      it "includes has_many relationships" do
        dashboard = file("app/dashboards/customer_dashboard.rb")

        run_generator ["customer"]

        expect(dashboard).to contain("orders: Field::HasMany")
      end

      it "looks for class_name options on has_many fields" do
        class Customer < ActiveRecord::Base
          has_many :purchases, class_name: "Order", foreign_key: "purchase_id"
        end
        dashboard = file("app/dashboards/customer_dashboard.rb")

        run_generator ["customer"]

        expect(dashboard).to contain(
          'purchases: Field::HasMany.with_options(class_name: "Order")',
        )
      end

      it "includes belongs_to relationships" do
        dashboard = file("app/dashboards/order_dashboard.rb")

        run_generator ["order"]

        expect(dashboard).to contain("customer: Field::BelongsTo")
      end

      it "detects has_one relationships" do
        ActiveRecord::Schema.define do
          create_table :accounts, force: true

          create_table :profiles, force: true do |t|
            t.references :account
          end
        end

        class Account < ActiveRecord::Base
          has_one :profile
        end

        class Ticket < ActiveRecord::Base
          belongs_to :account
        end

        dashboard = file("app/dashboards/account_dashboard.rb")

        run_generator ["account"]

        expect(dashboard).to contain("profile: Field::HasOne")
      end
    end

    describe "#table_attributes" do
      it "is limited to a reasonable number of items" do
        dashboard = file("app/dashboards/customer_dashboard.rb")
        limit =
          Administrate::Generators::DashboardGenerator::TABLE_ATTRIBUTE_LIMIT

        run_generator ["customer"]

        expect(dashboard).to contain(
          "def table_attributes\n    attributes.first(#{limit})",
        )
      end
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
        "class Admin::CustomersController < Admin::ApplicationController",
      )
    end
  end
end
