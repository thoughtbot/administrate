require "rails_helper"
require "generators/administrate/views/layout_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::Views::LayoutGenerator, :generator do
  describe "administrate:views:layout" do
    it "copies the layout template into the `admin/application` namespace" do
      allow(Rails::Generators).to receive(:invoke)
      expected_contents = File.read(
        "app/views/layouts/administrate/application.html.erb",
      )

      run_generator []
      contents = File.read(file("app/views/layouts/admin/application.html.erb"))

      expect(contents).to eq(expected_contents)
    end

    it "copies the flashes partial into the `admin/application` namespace" do
      allow(Rails::Generators).to receive(:invoke)
      expected_contents = contents_for_application_template("_flashes")
      generated_file = file("app/views/admin/application/_flashes.html.erb")

      run_generator []
      contents = File.read(generated_file)

      expect(contents).to eq(expected_contents)
    end

    it "copies the navigation partial into the `admin/application` namespace" do
      allow(Rails::Generators).to receive(:invoke)

      run_generator []

      expect(Rails::Generators).
        to invoke_generator("administrate:views:navigation")
    end

    it "copies the javascript partial into the `admin/application` namespace" do
      allow(Rails::Generators).to receive(:invoke)
      expected_contents = contents_for_application_template("_javascript")
      generated_file = file("app/views/admin/application/_javascript.html.erb")

      run_generator []
      contents = File.read(generated_file)

      expect(contents).to eq(expected_contents)
    end
  end
end
