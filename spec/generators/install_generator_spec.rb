require "spec_helper"
require "generators/administrate/install/install_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::InstallGenerator, :generator do
  describe "dashboard_controller" do
    it "is copied to the application" do
      provide_existing_routes_file
      controller = file("app/controllers/admin/dashboard_controller.rb")

      run_generator

      expect(controller).to exist
      expect(controller).to have_correct_syntax
      expect(controller).to contain(
        "class Admin::DashboardController < Administrate::ApplicationController"
      )
    end
  end

  describe "dashboard_manifest" do
    it "is copied to the dashboards folder" do
      provide_existing_routes_file
      manifest = file("app/dashboards/dashboard_manifest.rb")

      run_generator

      expect(manifest).to exist
      expect(manifest).to have_correct_syntax
      expect(manifest).to contain("class DashboardManifest")
      expect(manifest).to contain("def dashboards")
      expect(manifest).to contain("def root_dashboard")
    end

    it "populates default dashboards based on current ActiveRecord models" do
      provide_existing_routes_file
      manifest = file("app/dashboards/dashboard_manifest.rb")

      run_generator

      [:customers, :line_items, :orders, :products].each do |model|
        expect(manifest).to contain(":#{model}")
      end
      expect(manifest).not_to contain("Delayed::Backend::ActiveRecord::Job")
    end
  end

  describe "config/routes.rb" do
    it "inserts an admin namespace with dashboard resources" do
      provide_existing_routes_file
      routes = file("config/routes.rb")

      run_generator

      expect(routes).to have_correct_syntax
      expect(routes).to contain("namespace :admin do")
      expect(routes).to contain(
        "DashboardManifest.new.dashboards.each do |dashboard_resource|"
      )
      expect(routes).to contain("resources dashboard_resource")
    end

    it "creates a root route for the admin namespace" do
      provide_existing_routes_file
      routes = file("config/routes.rb")

      run_generator

      expect(routes).to contain(
        "root controller: DashboardManifest.new.root_dashboard, action: :index"
      )
    end
  end
end
