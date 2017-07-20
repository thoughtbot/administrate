require "spec_helper"
# require "support/constant_helpers"
# require "administrate/field/string"
# require "administrate/field/email"
# require "administrate/field/number"
require "administrate/search"

describe Administrate::Search::Query do
  let(:query) { "foo bar" }

  it "returns the parsed search terms" do
    query = described_class.new("foo bar")
    expect(query.terms).to eq("foo bar")
  end

  it "treats nil as a blank string" do
    query = described_class.new(nil)
    expect(query.terms).to eq("")
  end

  it "returns the original query" do
    query = described_class.new("original")
    expect(query.original).to eq("original")
  end

  it "uses the original query to represent itself as a string" do
    query = described_class.new("original")
    expect(query.to_s).to eq("original")
  end

  it "returns true if blank" do
    query = described_class.new("")
    expect(query).to be_blank
  end
end
