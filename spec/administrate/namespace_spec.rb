require "rails_helper"
require "administrate/namespace"

describe Administrate::Namespace do
  describe "#resources" do
    it "searches the routes for resources in the namespace" do
      begin
        Rails.application.routes.draw do
          namespace(:admin) { resources :customers }
        end

        namespace = Administrate::Namespace.new(:admin)

        expect(namespace.resources).to eq [:customers]
      ensure
        reset_routes
      end
    end

    it "leaves out resources marked administrate: false" do
      begin
        Rails.application.routes.draw do
          namespace(:admin) do
            resources :customers, administrate: false
            resources :products, administrate: true
          end
        end

        namespace = Administrate::Namespace.new(:admin)

        expect(namespace.resources).to eq [:products]
      ensure
        reset_routes
      end
    end
  end
end
