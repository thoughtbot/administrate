require "rails_helper"
require "administrate/field/boolean"
require "support/field_matchers"

describe Administrate::Field::Boolean do
  include FieldMatchers

  describe "#partial_prefixes" do
    it "returns the partial prefixes based on the field class" do
      page = :show
      boolean = double
      field = Administrate::Field::Boolean.new(:price, boolean, page)

      prefixes = field.partial_prefixes

      expect(prefixes).to eq([
        "fields/boolean/looks/default", "fields/boolean",
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

  describe "#to_s" do
    it "prints true or false" do
      t = Administrate::Field::Boolean.new(:quantity, true, :show)
      f = Administrate::Field::Boolean.new(:quantity, false, :show)

      expect(t.to_s).to eq("true")
      expect(f.to_s).to eq("false")
    end

    context "when data is nil" do
      it "returns a dash" do
        boolean = Administrate::Field::Boolean.new(:boolean, nil, :page)

        expect(boolean.to_s).to eq("-")
      end
    end
  end
end
