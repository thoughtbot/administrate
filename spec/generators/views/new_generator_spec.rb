require "spec_helper"
require "generators/administrate/views/new_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::Views::NewGenerator, :generator do
  describe "administrate:views:new" do
    it "copies the new template into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("new")

      run_generator []
      contents = File.read(file("app/views/admin/application/new.html.erb"))

      expect(contents).to eq(expected_contents)
    end

    it "copies the form partial into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("_form")

      run_generator []
      contents = File.read(file("app/views/admin/application/_form.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end

  describe "administrate:views:new resource" do
    it "copies the new template into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("new")

      run_generator ["users"]
      contents = File.read(file("app/views/admin/users/new.html.erb"))

      expect(contents).to eq(expected_contents)
    end

    it "copies the form partial into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("_form")

      run_generator ["users"]
      contents = File.read(file("app/views/admin/users/_form.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end
end
