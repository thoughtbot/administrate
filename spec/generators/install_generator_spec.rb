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

  describe "manifest generator" do
    it "invokes the Manifest generator if the manifest does not yet exist" do
      begin
        remove_constants :DashboardManifest
        stub_generator_dependencies

        expect { run_generator }.to raise_error

        expect(Rails::Generators).to invoke_generator("administrate:manifest")
      ensure
        load "spec/example_app/app/dashboards/dashboard_manifest.rb"
      end
    end

    it "does not invoke the manifest generator if a manifest already exists" do
      stub_generator_dependencies

      run_generator

      expect(Rails::Generators).not_to invoke_generator("administrate:manifest")
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
        expect(Rails::Generators).
          to invoke_generator("administrate:dashboard", [resource])
      end
    end
  end

  def stub_generator_dependencies
    provide_existing_routes_file
    allow(Rails::Generators).to receive(:invoke)
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
