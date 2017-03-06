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

    it "returns no results if there are no resources in the namespace" do
      begin
        namespace = Administrate::Namespace.new(:admin)
        Rails.application.routes.draw do
          namespace(:admin) { root to: '#index' }
        end

        expect(namespace.resources).to eq []
      ensure
        reset_routes
      end
    end
  end
end
