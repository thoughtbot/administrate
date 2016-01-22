require "rails_helper"
require "generators/administrate/views/views_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::ViewsGenerator, :generator do
  describe "administrate:views resource" do
    it "runs all sub-generators" do
      allow(Rails::Generators).to receive(:invoke)
      resource = "users"

      run_generator [resource]

      %w[index show new edit].each do |generator|
        expect(Rails::Generators).
          to invoke_generator("administrate:views:#{generator}", [resource])
      end
    end

    it "revokes sub-generators if run through `rails destroy`" do
      allow(Rails::Generators).to receive(:invoke)
      resource = "users"

      run_generator [resource], behavior: :revoke

      expect(Rails::Generators).to invoke_generator(
        "administrate:views:index",
        [resource],
        behavior: :revoke,
      )
    end
  end
end
