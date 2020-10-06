require "rails_helper"

RSpec.describe Administrate::GeneratorHelpers do
  include Administrate::GeneratorHelpers

  describe "#find_routes_file" do
    it "returns the typical path for a Rails routes file if found" do
      typical_routes_path = "config/routes.rb"

      returned_path = find_routes_file

      expect(returned_path.to_s).to include(typical_routes_path)
    end
  end
end
