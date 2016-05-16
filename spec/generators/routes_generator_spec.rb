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

      [:customers, :line_items, :orders, :products].each do |model|
        expect(routes).to contain("resources :#{model}")
      end
      expect(routes).not_to contain("Delayed::Backend::ActiveRecord::Job")
    end

    it "skips namespaced models with a warning" do
      stub_generator_dependencies
      routes = file("config/routes.rb")

      output = run_generator

      expect(routes).not_to contain("delayed/backend/active_record/jobs")
      expect(output).to include("WARNING: Unable to generate a dashboard for Delayed::Backend::ActiveRecord::Job")
    end

    it "skips models that aren't backed by the database with a warning" do
      begin
        class ModelWithoutDBTable < ActiveRecord::Base; end
        stub_generator_dependencies
        routes = file("config/routes.rb")

        output = run_generator

        expect(routes).not_to contain("model_without_db_table")
        expect(output).to include("WARNING: Unable to generate a dashboard for ModelWithoutDBTable")
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

    it "skips abstract models without a warning" do
      stub_generator_dependencies
      routes = file("config/routes.rb")

      begin
        class AbstractModel < ActiveRecord::Base
          self.abstract_class = true
        end

        output = run_generator

        expect(routes).not_to contain("abstract_model")
        expect(output).not_to include("WARNING: Unable to generate a dashboard for AbstractModel")
      end
    end
  end

  it "creates a root route for the admin namespace" do
    stub_generator_dependencies
    routes = file("config/routes.rb")

    run_generator

    expect(routes).to contain('root to: "customers#index')
  end
end
