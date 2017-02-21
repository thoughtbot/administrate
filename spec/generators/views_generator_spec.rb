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

    context "when run without any arguments" do
      it "calls the sub-generators without any arguments" do
        application_resource_path = instance_double("BaseResourcePath")
        allow(Administrate::ViewGenerator::BaseResourcePath).to receive(:new).
          and_return(application_resource_path)
        allow(Rails::Generators).to receive(:invoke)

        run_generator

        %w[index show new edit].each do |generator|
          expect(Rails::Generators). to invoke_generator(
            "administrate:views:#{generator}",
            [application_resource_path],
          )
        end
      end
    end
  end
end
