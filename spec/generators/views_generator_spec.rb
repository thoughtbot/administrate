require "rails_helper"
require "support/generator_spec_helpers"
require "generators/administrate/views/views_generator"

describe Administrate::Generators::ViewsGenerator, :generator do
  describe "administrate:views resource" do
    it "runs all sub-generators" do
      allow(Rails::Generators).to receive(:invoke)
      resource = "users"

      run_generator [resource]

      %w[index show new edit].each do |generator|
        expect(Rails::Generators).
          to invoke_generator(
            "administrate:views:#{generator}",
            [resource, "--namespace", :admin],
          )
      end
    end

    it "revokes sub-generators if run through `rails destroy`" do
      allow(Rails::Generators).to receive(:invoke)
      resource = "users"

      run_generator [resource], behavior: :revoke

      expect(Rails::Generators).to invoke_generator(
        "administrate:views:index",
        [resource, "--namespace", :admin],
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
            [application_resource_path, "--namespace", :admin],
          )
        end
      end
    end

    context "when run with a namespace specified" do
      it "runs all sub-generators with a namespace" do
        allow(Rails::Generators).to receive(:invoke)
        resource = "users"
        namespace = "console"

        run_generator [resource, "--namespace", namespace]

        %w[index show new edit].each do |generator|
          expect(Rails::Generators).
            to invoke_generator(
              "administrate:views:#{generator}",
              [resource, "--namespace", namespace],
            )
        end
      end
    end
  end
end
