require "rails_helper"
require "generators/administrate/assets/assets_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::AssetsGenerator, :generator do
  describe "administrate:assets" do
    it "runs all sub-generators" do
      allow(Rails::Generators).to receive(:invoke)

      run_generator []

      %w[javascripts stylesheets].each do |asset|
        expect(Rails::Generators).
          to invoke_generator("administrate:assets:#{asset}")
      end
    end
  end
end
