require "spec_helper"
require "administrate/fields/belongs_to"

describe Administrate::Field::BelongsTo do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      owner = double
      field = Administrate::Field::BelongsTo.new(:owner, owner, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/#{page}/belongs_to")
    end
  end
end
