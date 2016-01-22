require "rails_helper"
require "generators/administrate/assets/images_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::Assets::ImagesGenerator, :generator do
  describe "administrate:assets:images" do
    it "copies the images directory into the `administrate` namespace" do
      images_directory = "app/assets/images/administrate/**/*"

      run_generator []

      each_file_in(images_directory) do |copied_file_path|
        expected_contents = File.read(copied_file_path)
        contents = File.read(file(copied_file_path))

        expect(contents).to eq(expected_contents)
      end
    end
  end
end
