require "rails_helper"
require "administrate/namespace"

describe Administrate::Namespace do
  describe "#resources" do
    it "searches the routes for resources in the namespace" do
      begin
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
  end

  describe "#resources_with_index_route" do
    it "returns only resources with the index route" do
      begin
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
    end

    it "returns a list of unique resources" do
      begin
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
end
