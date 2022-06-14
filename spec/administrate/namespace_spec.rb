require "rails_helper"
require "administrate/namespace"

describe Administrate::Namespace do
  describe "#routes" do
    it "returns the list of routes as a hash" do
      namespace = Administrate::Namespace.new(:admin)

      Rails.application.routes.draw do
        namespace(:admin) do
          resources :customers do
            resources :orders, only: %i[show edit]
          end
        end
      end

      routes = namespace.routes.select { |route| route.first == "orders" }
      expected_routes = {
        ["orders", "edit"] => ["customer_id", "id"],
        ["orders", "show"] => ["customer_id", "id"],
      }
      expect(routes).to eq(expected_routes)
    ensure
      reset_routes
    end
  end

  describe "#resources" do
    it "searches the routes for resources in the namespace" do
      namespace = Administrate::Namespace.new(:admin)

      Rails.application.routes.draw do
        namespace(:admin) { resources :customers }
        resources :administrators
      end

      expect(namespace.resources.map(&:to_sym)).to eq [:customers]
    ensure
      reset_routes
    end
  end

  describe "#resources_with_index_route" do
    it "returns only resources with the index route" do
      namespace = Administrate::Namespace.new(:admin)

      Rails.application.routes.draw do
        namespace(:admin) do
          resources :customers
          resources :products, only: [:show]
        end
      end

      expect(namespace.resources_with_index_route).to eq ["customers"]
    ensure
      reset_routes
    end

    it "returns a list of unique resources" do
      namespace = Administrate::Namespace.new(:admin)

      Rails.application.routes.draw do
        namespace(:admin) do
          resources :customers
          resources :products, only: [:show]

          root to: "customers#index"
        end
      end

      expect(namespace.resources_with_index_route).to eq ["customers"]
    ensure
      reset_routes
    end
  end
end
