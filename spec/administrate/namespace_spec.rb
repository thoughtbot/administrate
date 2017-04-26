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

    it "handles namespaced resources in the admin namespace" do
      begin
        namespace = Administrate::Namespace.new(:admin)
        Rails.application.routes.draw do
          namespace(:admin) do
            namespace(:catalog) { resources :products }
          end
        end

        expect(namespace.resources).to eq [:'catalog/products']
      ensure
        reset_routes
      end
    end
  end
end
