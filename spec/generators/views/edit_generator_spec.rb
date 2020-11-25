require "support/generator_spec_helpers"
require "generators/administrate/views/edit_generator"

describe Administrate::Generators::Views::EditGenerator, :generator do
  describe "administrate:views:edit" do
    it "copies the edit template into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("edit")

      run_generator []
      contents = File.read(file("app/views/admin/application/edit.html.erb"))

      expect(contents).to eq(expected_contents)
    end

    it "copies the form partial into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("_form")

      run_generator []
      contents = File.read(file("app/views/admin/application/_form.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end

  describe "administrate:views:edit resource" do
    it "copies the edit template into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("edit")

      run_generator ["LineItem"]
      contents = File.read(file("app/views/admin/line_items/edit.html.erb"))

      expect(contents).to eq(expected_contents)
    end

    it "copies the form partial into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("_form")

      run_generator ["users"]
      contents = File.read(file("app/views/admin/users/_form.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end

  describe "administrate:views:edit resource --namespace <namespace>" do
    it "copies the edit template into the `<namespace>/resource` namespace" do
      expected_contents = contents_for_application_template("edit")

      run_generator ["LineItem", "--namespace", "test"]
      contents = File.read(file("app/views/test/line_items/edit.html.erb"))

      expect(contents).to eq(expected_contents)
    end

    it "copies the form partial into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("_form")

      run_generator ["users", "--namespace", "test2"]
      contents = File.read(file("app/views/test2/users/_form.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end
end
