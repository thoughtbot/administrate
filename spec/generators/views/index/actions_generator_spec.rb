require "support/generator_spec_helpers"
require "generators/administrate/views/index/actions_generator"

describe Administrate::Generators::Views::Index::ActionsGenerator, :generator do
  describe "administrate:views:index:actions" do
    it "copies the actions partial into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("_actions")
      generated_file = file("app/views/admin/application/_actions.html.erb")

      run_generator []
      contents = File.read(generated_file)

      expect(contents).to eq(expected_contents)
    end

    it "copies action_headers partial into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("_action_headers")
      generated_file = file(
        "app/views/admin/application/_action_headers.html.erb",
      )

      run_generator []
      contents = File.read(generated_file)

      expect(contents).to eq(expected_contents)
    end
  end

  describe "administrate:views:index:actions resource" do
    it "copies the actions partial into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("_actions")

      run_generator ["users"]
      contents = File.read(file("app/views/admin/users/_actions.html.erb"))

      expect(contents).to eq(expected_contents)
    end

    it "copies action_headers partial into the `admin/resource` namespace" do
      expected_contents = contents_for_application_template("_action_headers")
      generated_file = file("app/views/admin/users/_action_headers.html.erb")

      run_generator ["users"]
      contents = File.read(generated_file)

      expect(contents).to eq(expected_contents)
    end
  end
end
