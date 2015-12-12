require "rails_helper"
require "generators/administrate/views/views_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::ViewsGenerator, :generator do
  describe "administrate:views resource" do
    it "runs all sub-generators" do
      allow(Rails::Generators).to receive(:invoke)
      resource = "users"

      run_generator [resource]

      expect(Rails::Generators).to invoke_generator("administrate:views:layout")

      %w[index show new edit].each do |generator|
        expect(Rails::Generators).
          to invoke_generator("administrate:views:#{generator}", [resource])
      end
    end
  end

  def invoke_generator(*args)
    have_received(:invoke).with(*args)
  end
end
