require "administrate/field/has_one"
require "support/constant_helpers"

describe Administrate::Field::HasOne do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      owner = double
      field = Administrate::Field::HasOne.new(:owner, owner, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/has_one/#{page}")
    end
  end
end
