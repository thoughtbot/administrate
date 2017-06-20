require "spec_helper"
require "administrate/search_term_parser"

describe Administrate::SearchTermParser, searching: true do
  describe '.parse' do
    it "returns the string as a search term for all search terms" do
      expect(described_class.parse("foobar")).to eq all: "foobar"
    end

    it "does not interpret search terms" do
      expect(described_class.parse("23")).to eq all: "23"
    end

    it "returns the labeled search term" do
      expect(described_class.parse("foo: bar")).to eq foo: "bar"
    end

    it "returns the labeled search term and an :all search term" do
      expect(described_class.parse("foo: bar, baz")).to eq(
        foo: "bar",
        all: "baz",
      )
    end

    it "returns the labeled search terms" do
      expect(described_class.parse("foo: bar, baz: blat")).to eq(
        foo: "bar",
        baz: "blat",
      )
    end

    it "converts multiple occurrences of a labeled search term into an array of terms" do
      expect(described_class.parse("foo: bar, foo: blat")).to eq(
        foo: %w[bar blat],
      )
    end

    it "can create an arrayed search term from the :all label" do
      expect(described_class.parse("all: foo, all: bar, year: 2014")).to eq(
        all: %w[foo bar],
        year: "2014",
      )
    end
  end
end
