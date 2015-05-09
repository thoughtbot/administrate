require "spec_helper"
require "fields/string"

describe Field::String do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Field::String.new(:string, "hello", page)

      path = field.to_partial_path

      expect(path).to eq("/fields/#{page}/string")
    end
  end
end
