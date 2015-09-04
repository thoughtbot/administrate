require "spec_helper"
require "generators/administrate/install/install_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::InstallGenerator, :generator do
  describe "admin/application_controller" do
    it "is copied to the application" do
      stub_generator_dependencies
      controller = file("app/controllers/admin/application_controller.rb")

      run_generator

      expect(controller).to exist
      expect(controller).to have_correct_syntax
      expect(controller).to contain(
        "class Admin::ApplicationController < Administrate::ApplicationController"
      )
    end
  end

  describe "dashboard_manifest" do
    it "is copied to the dashboards folder" do
      stub_generator_dependencies
      manifest = file("app/dashboards/dashboard_manifest.rb")

      run_generator

      expect(manifest).to exist
      expect(manifest).to have_correct_syntax
      expect(manifest).to contain("class DashboardManifest")
      expect(manifest).to contain("DASHBOARDS = [")
      expect(manifest).to contain("ROOT_DASHBOARD = DASHBOARDS.first")
    end

    it "populates default dashboards based on current ActiveRecord models" do
      stub_generator_dependencies
      manifest = file("app/dashboards/dashboard_manifest.rb")

      run_generator

      [:customers, :line_items, :orders, :products].each do |model|
        expect(manifest).to contain(":#{model}")
      end
      expect(manifest).not_to contain("Delayed::Backend::ActiveRecord::Job")
    end

    it "skips namespaced models with a warning" do
      stub_generator_dependencies
      manifest = file("app/dashboards/dashboard_manifest.rb")

      run_generator

      expect(manifest).not_to contain("delayed/backend/active_record/jobs")
    end
  end

  describe "config/routes.rb" do
    it "inserts an admin namespace with dashboard resources" do
      begin
        stub_generator_dependencies

        clear_routes
        run_generator
        load file("config/routes.rb")

        routes = Rails.application.routes.routes.named_routes
        customers_controller = routes["admin_customers"].defaults[:controller]
        expect(customers_controller).to eq("admin/application")
      ensure
        reset_routes
      end
    end

    it "creates a root route for the admin namespace" do
      begin
        stub_generator_dependencies

        clear_routes
        run_generator
        load file("config/routes.rb")

        routes = Rails.application.routes.routes.named_routes
        root_info = routes["admin_root"].defaults
        expect(root_info[:controller]).to eq("admin/application")
        expect(root_info[:resource_class]).
          to eq(DashboardManifest::ROOT_DASHBOARD)
      ensure
        reset_routes
      end
    end
  end

  describe "resource dashboards" do
    it "is generated" do
      stub_generator_dependencies

      run_generator

      %w[customer order product line_item].each do |resource|
        expect(Rails::Generators).to have_received(:invoke).
          with("administrate:dashboard", [resource])
      end
    end
  end

  def stub_generator_dependencies
    provide_existing_routes_file
    allow(Rails::Generators).to receive(:invoke)
  end

  def reset_routes
    clear_routes
    load Rails.root.to_s + "/config/routes.rb"
  end

  def clear_routes
    Rails.application.routes.clear!
  end
end
