require "spec_helper"
require "generators/administrate/views/index_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::Views::IndexGenerator, :generator do
  describe "administrate:views:index" do
    it "copies the index template into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("index")

      run_generator []
      contents = File.read(file("app/views/admin/application/index.html.erb"))

      expect(contents).to eq(expected_contents)
    end

    it "copies the table partial into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("_table")

      run_generator []
      contents = File.read(file("app/views/admin/application/_table.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end

  describe "administrate:views:index resource" do
    it "copies the index view into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("index")

      run_generator ["users"]
      contents = File.read(file("app/views/admin/users/index.html.erb"))

      expect(contents).to eq(expected_contents)
    end

    it "copies the table partial into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("_table")

      run_generator ["users"]
      contents = File.read(file("app/views/admin/users/_table.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end
end
