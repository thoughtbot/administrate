require "rails_helper"
require "support/constant_helpers"
require "support/generator_spec_helpers"
require "generators/administrate/routes/routes_generator"

describe Administrate::Generators::RoutesGenerator, :generator do
  before { stub_generator_dependencies }

  after { reset_routes }

  describe "routes" do
    it "populates default dashboards based on current ActiveRecord models" do
      routes = file("config/routes.rb")

      run_generator

      [:customers, :line_items, :orders, :products].each do |model|
        expect(routes).to contain("resources :#{model}")
      end
    end

    it "populates default dashboards under the given namespace" do
      routes = file("config/routes.rb")

      run_generator ["--namespace", "manager"]

      expect(routes).to contain("namespace :manager")
    end

    it "does not populate routes when no models exist" do
      routes = file("config/routes.rb")
      allow(ActiveRecord::Base).to receive(:descendants).and_return([])

      run_generator

      expect(routes).not_to contain("namespace :admin")
    end

    it "generates routes for namespaced models" do
      routes = file("config/routes.rb")

      run_generator

      expect(routes).to contain("blog")
      expect(routes).to contain("post")
    end

    it "skips models that aren't backed by the database with a warning" do
      begin
        class ModelWithoutDBTable < ApplicationRecord; end
        routes = file("config/routes.rb")

        output = run_generator

        expect(routes).not_to contain("model_without_db_table")
        expect(output).to include("WARNING: Unable to generate a dashboard " \
          "for ModelWithoutDBTable.")
      ensure
        remove_constants :ModelWithoutDBTable
      end
    end

    it "skips models that don't have a named constant" do
      ActiveRecord::Migration.suppress_messages do
        ActiveRecord::Schema.define { create_table(:foos) }
      end
      _unnamed_model = Class.new(ApplicationRecord) do
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
        class AbstractModel < ApplicationRecord
          self.abstract_class = true
        end

        output = run_generator

        expect(routes).not_to contain("abstract_model")
        expect(output).not_to include("WARNING: Unable to generate a "\
          "dashboard for AbstractModel")
      end
    end

    it "groups together warnings related to the same model" do
      class TestModelNamespace
        class ModelWithoutDBTable < ApplicationRecord; end
      end

      model_name = TestModelNamespace::ModelWithoutDBTable.to_s
      output = run_generator

      warning = "WARNING: Unable to generate a dashboard " \
        "for #{model_name}."
      occurrences = output.scan(warning).count
      expect(occurrences).to eq(1)
    ensure
      remove_constants :TestModelNamespace
    end
  end

  it "creates a root route for the admin namespace" do
    routes = file("config/routes.rb")

    run_generator

    expect(routes).to contain('root to: "customers#index"')
    # Need to work out hoe to stop unneeded namespaced routes being made
    # eg. ActiveRecord and Primary
  end
end
