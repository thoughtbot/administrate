require "rails_helper"
require "generators/administrate/routes/routes_generator"
require "support/generator_spec_helpers"
require "support/constant_helpers"

describe Administrate::Generators::RoutesGenerator, :generator do
  describe "routes" do
    it "populates default dashboards based on current ActiveRecord models" do
      stub_generator_dependencies
      routes = file("config/routes.rb")

      run_generator

      %w[customers line_items orders].each do |model|
        expect(routes).to contain("resources :#{model}")
      end
      expect(routes).to contain("namespace :catalog do\n      resources :products\n    end")
      expect(routes).to_not contain("namespace :active_record do\n      resources :schema_migrations\n    end")
      expect(routes).not_to contain("resources :delayed/backend/active_record/jobs")
    end

    it "does not populate routes when no models exist" do
      stub_generator_dependencies
      routes = file("config/routes.rb")
      allow(ActiveRecord::Base).to receive(:descendants).and_return([])

      run_generator

      expect(routes).not_to contain("namespace :admin")
    end

    it "skips namespaced models with a warning" do
      stub_generator_dependencies
      routes = file("config/routes.rb")

      run_generator

      expect(routes).not_to contain("delayed/backend/active_record/jobs")
    end

    it "skips models that aren't backed by the database" do
      begin
        class ModelWithoutDBTable < ActiveRecord::Base; end
        stub_generator_dependencies
        routes = file("config/routes.rb")

        run_generator

        expect(routes).not_to contain("model_without_db_table")
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

      routes = file("config/routes.rb")
      expect(routes).to have_correct_syntax
    end
  end

  it "creates a root route for the admin namespace" do
    stub_generator_dependencies
    routes = file("config/routes.rb")

    run_generator

    expect(routes).to contain('root to: "customers#index')
  end
end
