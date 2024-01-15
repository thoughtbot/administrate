require "rails_helper"
require "support/constant_helpers"
require "support/generator_spec_helpers"
require "generators/administrate/install/install_generator"

describe Administrate::Generators::InstallGenerator, :generator do
  after { reset_routes }

  describe "application_controller" do
    it "is copied to the application" do
      stub_generator_dependencies
      controller = file("app/controllers/admin/application_controller.rb")

      run_generator

      expect(Pathname.new(controller)).to exist
      expect(controller).to have_correct_syntax
      expect(controller).to contain <<-RB.strip_heredoc
        module Admin
          class ApplicationController < Administrate::ApplicationController
      RB
    end

    it "uses the namespace option" do
      stub_generator_dependencies
      controller = file("app/controllers/manager/application_controller.rb")

      run_generator ["--namespace", "manager"]

      expect(Pathname.new(controller)).to exist
      expect(controller).to have_correct_syntax
      expect(controller).to contain <<-RB.strip_heredoc
        module Manager
          class ApplicationController < Administrate::ApplicationController
      RB
    end
  end

  describe "routes generator" do
    it "invokes the routes generator if there are no namespace resources" do
      stub_generator_dependencies
      Rails.application.routes.draw {}

      run_generator

      expect(Rails::Generators).to invoke_generator(
        "administrate:routes", ["--namespace", "admin"]
      )
    end

    it "does not invoke routes generator if namespace routes already exist" do
      stub_generator_dependencies
      Rails.application.routes.draw do
        namespace(:admin) { resources :customers }
      end

      run_generator

      expect(Rails::Generators).not_to invoke_generator(
        "administrate:routes", ["--namespace", "admin"]
      )
    end

    context "using the namespace option" do
      it "invokes the routes generator if there are no namespace resources" do
        stub_generator_dependencies
        Rails.application.routes.draw {}

        run_generator ["--namespace", "manager"]

        expect(Rails::Generators).to invoke_generator(
          "administrate:routes", ["--namespace", "manager"]
        )
      end

      it "does not invoke routes generator if namespace routes already exist" do
        stub_generator_dependencies
        Rails.application.routes.draw do
          namespace(:manager) { resources :customers }
        end

        run_generator ["--namespace", "manager"]

        expect(Rails::Generators).not_to invoke_generator(
          "administrate:routes", ["--namespace", "manager"]
        )
      end
    end
  end

  describe "resource dashboards" do
    it "is generated" do
      stub_generator_dependencies

      run_generator

      %w[customer order product line_item].each do |resource|
        expect(Rails::Generators).
          to invoke_generator(
            "administrate:dashboard", [resource, "--namespace", "admin"]
          )
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
