require "rails_helper"
require "administrate/field/color"

describe Administrate::Field::Color do
  describe "#color" do
    it "displays the color" do
      field = described_class.new(:color,'#FF5733', :show)

      prefixes = field.partial_prefixes

      expect(prefixes).to eq(["fields/color", "fields/base"])
    end
  end
end
