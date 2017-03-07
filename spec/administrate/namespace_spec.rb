require "rails_helper"
require "administrate/namespace"

describe Administrate::Namespace do
  describe "#resources" do
    it "searches the routes for resources in the namespace" do
      begin
        namespace = Administrate::Namespace.new(:admin)
        Rails.application.routes.draw do
          namespace(:admin) { resources :customers }
          namespace(:admin) { root to: "#index" }
        end

        expect(namespace.resources).to eq [:customers]
        expect(namespace.resources).not_to include :""
      ensure
        reset_routes
      end
    end
  end
end
