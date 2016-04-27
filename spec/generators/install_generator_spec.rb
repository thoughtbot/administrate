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

  describe "routes generator" do
    it "invokes the routes generator if there are no namespace resources" do
      begin
        stub_generator_dependencies
        Rails.application.routes.draw {}

        run_generator

        expect(Rails::Generators).to invoke_generator("administrate:routes")
      ensure
        reset_routes
      end
    end

    it "does not invoke routes generator if namespace routes already exist" do
      begin
        stub_generator_dependencies
        Rails.application.routes.draw do
          namespace(:admin) { resources :customers }
        end

        run_generator

        expect(Rails::Generators).not_to invoke_generator("administrate:routes")
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
        expect(Rails::Generators).
          to invoke_generator("administrate:dashboard", [resource])
      end
    end
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
