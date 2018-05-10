require "administrate/field/text"

describe Administrate::Field::Text do
  describe "#short_plain_text" do
    it "returns #truncate" do
      string = "c" * (described_class.default_truncation_length + 1)
      field = described_class.new(:string, string, :page)
      expect(field.short_plain_text).to eq(field.truncate)
    end
  end
end
