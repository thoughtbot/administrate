require "spec_helper"
require "generators/administrate/views/sidebar_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::Views::SidebarGenerator, :generator do
  describe "administrate:views:sidebar" do
    it "copies the sidebar partial into the `admin/application` namespace" do
      expected_contents = contents_for_application_template("_sidebar")
      generated_file = file("app/views/admin/application/_sidebar.html.erb")

      run_generator []

      contents = File.read(generated_file)
      expect(contents).to eq(expected_contents)
    end
  end
end
