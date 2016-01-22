require "rails_helper"
require "generators/administrate/manifest/manifest_generator"
require "support/generator_spec_helpers"
require "support/constant_helpers"

describe Administrate::Generators::ManifestGenerator, :generator do
  describe "dashboard_manifest" do
    it "is copied to the dashboards folder" do
      stub_generator_dependencies
      manifest = file("app/dashboards/dashboard_manifest.rb")

      run_generator

      expect(manifest).to exist
      expect(manifest).to have_correct_syntax
      expect(manifest).to contain("class DashboardManifest")
      expect(manifest).to contain("DASHBOARDS = [")
      expect(manifest).to contain("ROOT_DASHBOARD = DASHBOARDS.first")
    end

    it "populates default dashboards based on current ActiveRecord models" do
      stub_generator_dependencies
      manifest = file("app/dashboards/dashboard_manifest.rb")

      run_generator

      [:customers, :line_items, :orders, :products].each do |model|
        expect(manifest).to contain(":#{model}")
      end
      expect(manifest).not_to contain("Delayed::Backend::ActiveRecord::Job")
    end

    it "skips namespaced models with a warning" do
      stub_generator_dependencies
      manifest = file("app/dashboards/dashboard_manifest.rb")

      run_generator

      expect(manifest).not_to contain("delayed/backend/active_record/jobs")
    end

    it "skips models that aren't backed by the database" do
      begin
        class ModelWithoutDBTable < ActiveRecord::Base; end
        stub_generator_dependencies
        manifest = file("app/dashboards/dashboard_manifest.rb")

        run_generator

        expect(manifest).not_to contain("model_without_db_table")
      ensure
        remove_constants :ModelWithoutDBTable
      end
    end

    it "skips models that don't have a named constant" do
      stub_generator_dependencies
      ActiveRecord::Schema.define { create_table(:foos) }
      _unnamed_model = Class.new(ActiveRecord::Base) do
        def self.table_name
          :foos
        end
      end

      run_generator

      manifest = file("app/dashboards/dashboard_manifest.rb")
      expect(manifest).to have_correct_syntax
    end
  end

  def stub_generator_dependencies
    allow(Rails::Generators).to receive(:invoke)
  end
end
