require "spec_helper"
require "generators/administrate/views/show_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::Views::ShowGenerator, :generator do
  describe "administrate:views:show" do
    it "copies the show template into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("show")

      run_generator []
      contents = File.read(file("app/views/admin/application/show.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end

  describe "administrate:views:show resource" do
    it "copies the show view into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("show")

      run_generator ["users"]
      contents = File.read(file("app/views/admin/users/show.html.erb"))

      expect(contents).to eq(expected_contents)
    end
  end
end
