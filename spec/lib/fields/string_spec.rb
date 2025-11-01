require "rails_helper"
require "administrate/field/string"
require "support/field_matchers"

describe Administrate::Field::String do
  include FieldMatchers

  describe "#partial_prefixes" do
    it "returns the partial prefixes based on the field class" do
      page = :show
      field = Administrate::Field::String.new(:string, "hello", page)

      prefixes = field.partial_prefixes

      expect(prefixes).to eq([
        "fields/string/looks/default", "fields/string",
        "fields/base/looks/default", "fields/base"
      ])
    end
  end

  it do
    should_permit_param(
      "foo",
      on_model: Customer,
      for_attribute: :foo
    )
  end

  describe "#truncate" do
    it "renders an empty string for nil" do
      string = Administrate::Field::String.new(:description, nil, :show)

      expect(string.truncate).to eq("")
    end

    it "defaults to displaying up to 50 characters" do
      short = Administrate::Field::String.new(:title, lorem(30), :show)
      long = Administrate::Field::String.new(:description, lorem(60), :show)

      expect(short.truncate).to eq(lorem(30))
      expect(long.truncate).to eq(lorem(50))
    end

    context "with a `truncate` option" do
      it "shortens to the given length" do
        string = string_with_options(lorem(30), truncate: 20)

        expect(string.truncate).to eq(lorem(20))
      end
    end
  end

  def string_with_options(string, options)
    Administrate::Field::String.new(:string, string, :page, options)
  end

  def lorem(n)
    "a" * n
  end
end
