require "rails_helper"
require "generators/administrate/routes/routes_generator"
require "support/generator_spec_helpers"
require "support/constant_helpers"

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

    it "skips namespaced models with a warning" do
      routes = file("config/routes.rb")

      output = run_generator

      expect(routes).not_to contain("blog")
      expect(routes).not_to contain("post")

      expect(output).to include <<-MSG.strip_heredoc
        WARNING: Unable to generate a dashboard for Blog::Post.
                 Administrate does not yet support namespaced models.
      MSG
    end

    it "skips models that aren't backed by the database with a warning" do
      begin
        class ModelWithoutDBTable < ActiveRecord::Base; end
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
        expect(output).not_to include("WARNING: Unable to generate a "\
          "dashboard for AbstractModel")
      end
    end
  end

  it "creates a root route for the admin namespace" do
    routes = file("config/routes.rb")

    run_generator

    expect(routes).to contain('root to: "customers#index')
  end
end
