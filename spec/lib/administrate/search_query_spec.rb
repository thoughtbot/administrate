require "spec_helper"
require "administrate/search"

describe Administrate::Search::Query do
  subject { described_class.new(query) }

  context "when query is nil" do
    let(:query) { nil }

    it "treats nil as a blank string" do
      expect(subject.terms).to eq("")
    end
  end

  context "when query is blank" do
    let(:query) { "" }

    it "returns true if blank" do
      expect(subject).to be_blank
    end
  end

  context "when given a query with only terms" do
    let(:query) { "foo bar" }

    it "returns the parsed search terms" do
      expect(subject.terms).to eq("foo bar")
    end
  end

  context "when query includes filters" do
    let(:query) { "vip: active:" }

    it "is not blank" do
      expect(subject).to_not be_blank
    end

    it "parses filter syntax" do
      expect(subject.filters).to eq(["vip", "active"])
    end
  end

  context "when query includes both filters and terms" do
    let(:query) { "vip: example.com" }

    it "splits filters and terms" do
      expect(subject.filters).to eq(["vip"])
      expect(subject.terms).to eq("example.com")
    end
  end
end
