require "rails_helper"
require "generators/administrate/install/install_generator"
require "support/generator_spec_helpers"
require "support/constant_helpers"

describe Administrate::Generators::InstallGenerator, :generator do
  describe "admin/application_controller" do
    it "is copied to the application" do
      stub_generator_dependencies
      controller = file("app/controllers/admin/application_controller.rb")

      run_generator

      expect(controller).to exist
      expect(controller).to have_correct_syntax
      expect(controller).to contain <<-RB.strip_heredoc
        module Admin
          class ApplicationController < Administrate::ApplicationController
      RB
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

    it "skips models that aren't backed by the database" do
      begin
        class ModelWithoutDBTable < ActiveRecord::Base; end
        stub_generator_dependencies
        manifest = file("app/dashboards/dashboard_manifest.rb")

        run_generator

        expect(manifest).not_to contain("model_without_db_table")
      ensure
        remove_constants :ModelWithoutDBTable
      end
    end

    it "skips models that don't have a named constant" do
      stub_generator_dependencies
      ActiveRecord::Schema.define { create_table(:foos) }
      _unnamed_model = Class.new(ActiveRecord::Base) do
        def self.table_name
          :foos
        end
      end

      run_generator

      manifest = file("app/dashboards/dashboard_manifest.rb")
      expect(manifest).to have_correct_syntax
    end
  end

  describe "config/routes.rb" do
    it "inserts an admin namespace with dashboard resources" do
      stub_generator_dependencies
      routes = file("config/routes.rb")

      run_generator

      expect(routes).to have_correct_syntax
      expect(routes).to contain("namespace :admin do")
      expect(routes).to contain(
        "DashboardManifest::DASHBOARDS.each do |dashboard_resource|",
      )
      expect(routes).to contain("resources dashboard_resource")
    end

    it "creates a root route for the admin namespace" do
      stub_generator_dependencies
      routes = file("config/routes.rb")

      run_generator

      expect(routes).to contain(
        "root controller: DashboardManifest::ROOT_DASHBOARD, action: :index",
      )
    end

    it "skips the routes if they've already been generated" do
      stub_generator_dependencies
      insert_generated_routes
      routes_file = file("config/routes.rb")

      run_generator

      routes = File.read(routes_file)
      matches = routes.scan("DashboardManifest::DASHBOARDS")
      expect(matches.count).to eq(1)
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
    allow(Rails).to receive(:root).and_return(Pathname.new(file(".")))
  end

  def insert_generated_routes
    insert_into_file_after_line(
      1,
      file("config/routes.rb"),
      File.read("lib/generators/administrate/install/templates/routes.rb"),
    )
  end

  def insert_into_file_after_line(lines_before, file, insertion)
    lines = File.read(file).lines
    before = lines.shift(lines_before)
    new_lines = before + [insertion] + lines
    File.write(file, new_lines.join)
  end
end
