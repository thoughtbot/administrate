require "rails_helper"
require "administrate/namespace"

describe Administrate::Namespace do
  describe "#resources" do
    it "searches the routes for resources in the namespace" do
      begin
        namespace = Administrate::Namespace.new(:admin)
        Rails.application.routes.draw do
          namespace(:admin) { resources :customers }
        end

        expect(namespace.resources).to eq [:customers]
      ensure
        reset_routes
      end
    end

    it "excludes routes that are not defined in the dashboard manifest" do
      begin
        class DashboardManifest
          DASHBOARDS = [:customers].freeze
        end

        namespace = Administrate::Namespace.new(:admin)

        Rails.application.routes.draw do
          namespace(:admin) do
            resources :customers
            resources :purchases
          end
        end

        expect(namespace.resources).to eq [:customers]
      ensure
        reset_routes
        remove_constants :DashboardManifest
      end
    end
  end
end
