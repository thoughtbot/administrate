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
    subject { described_class.new(query, ["vip", "active"]) }
    let(:query) { "vip: active:" }

    it "is not blank" do
      expect(subject).to_not be_blank
    end

    it "parses filter syntax" do
      expect(subject.filters).to eq(["vip:", "active:"])
    end
  end

  context "when query includes both filters and terms" do
    subject { described_class.new(query, ["vip"]) }
    let(:query) { "vip: order:id order:11 order term" }

    it "splits filters and terms and does not confuse filters and terms" do
      expect(subject.filters).to eq(["vip:"])
      expect(subject.terms).to eq("order:id order:11 order term")
    end
  end

  context "when query includes both filters with params and terms" do
    subject { described_class.new(query, ["kind"]) }
    let(:query) { "kind:standard example.com" }

    it "splits filters and terms" do
      expect(subject.filters).to eq(["kind:standard"])
      expect(subject.terms).to eq("example.com")
    end
  end
end
