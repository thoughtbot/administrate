require "spec_helper"
require "adapters/belongs_to_adapter"

describe BelongsToAdapter do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      owner = double
      adapter = BelongsToAdapter.new(:owner, owner, page)

      path = adapter.to_partial_path

      expect(path).to eq("/adapters/#{page}/belongs_to")
    end
  end
end
