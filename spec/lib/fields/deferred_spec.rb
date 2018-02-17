require "administrate/field/deferred"
require "administrate/field/string"

describe Administrate::Field::Deferred do
  describe "#permitted_attribute" do
    context "when given a `foreign_key` option" do
      it "returns the value given" do
        deferred = Administrate::Field::Deferred.
          new(Administrate::Field::BelongsTo.with_options(foreign_key: :bar))
        expect(deferred.permitted_attribute(:foo)).to eq(:bar)
      end
    end

    context "when not given a `foreign_key` option" do
      it "delegates to the backing class" do
        deferred = Administrate::Field::Deferred.
          new(Administrate::Field::String)
        allow(Administrate::Field::String).to receive(:permitted_attribute)

        deferred.permitted_attribute(:foo)

        expect(Administrate::Field::String).
          to have_received(:permitted_attribute).with(:foo, {})
      end
    end
  end

  describe "#searchable?" do
    context "when given a `searchable` option" do
      it "returns the value given" do
        searchable_deferred = Administrate::Field::Deferred.
          new(double(searchable?: false), searchable: true)
        unsearchable_deferred = Administrate::Field::Deferred.
          new(double(searchable?: true), searchable: false)

        expect(searchable_deferred.searchable?).to eq(true)
        expect(unsearchable_deferred.searchable?).to eq(false)
      end
    end

    context "when not given a `searchable` option" do
      it "falls back to the default of the deferred class" do
        searchable_deferred = Administrate::Field::Deferred.
          new(double(searchable?: true))
        unsearchable_deferred = Administrate::Field::Deferred.
          new(double(searchable?: false))

        expect(searchable_deferred.searchable?).to eq(true)
        expect(unsearchable_deferred.searchable?).to eq(false)
      end
    end
  end

  describe "#==" do
    it "returns false for different deferred classes" do
      one = Administrate::Field::Deferred.new(String)
      two = Administrate::Field::Deferred.new(Integer)

      expect(one).not_to eq(two)
    end

    it "returns false for different options" do
      one = Administrate::Field::Deferred.new(String, a: 12)
      two = Administrate::Field::Deferred.new(String, a: :b)

      expect(one).not_to eq(two)
    end

    it "returns true if deferred class and options are equal" do
      one = Administrate::Field::Deferred.new(String, a: :b)
      two = Administrate::Field::Deferred.new(String, a: :b)

      expect(one).to eq(two)
    end
  end
end
