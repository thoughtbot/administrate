require "spec_helper"
require "generators/administrate/views/form_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::Views::FormGenerator, :generator do
  describe "administrate:views:form" do
    it "copies the form partial into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("_form")

      run_generator []
      contents = File.read(file("app/views/admin/application/_form.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end

  describe "administrate:views:form resource" do
    it "copies the form view into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("_form")

      run_generator ["users"]
      contents = File.read(file("app/views/admin/users/_form.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end
end
