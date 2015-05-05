require "spec_helper"
require "adapters/image_adapter"

describe ImageAdapter do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      adapter = ImageAdapter.new(:image, "http://placekitten.com/200/300", page)

      path = adapter.to_partial_path

      expect(path).to eq("/adapters/#{page}/image")
    end
  end
end
