require "spec_helper"
require "adapters/string_adapter"

describe StringAdapter do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      adapter = StringAdapter.new(:string, "hello", page)

      path = adapter.to_partial_path

      expect(path).to eq("/adapters/#{page}/string")
    end
  end
end
