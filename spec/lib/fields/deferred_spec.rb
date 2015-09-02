require "spec_helper"
require "administrate/fields/deferred"
require "administrate/fields/string"

describe Administrate::Field::Deferred do
  describe "#permitted_attribute" do
    it "delegates to the backing class" do
      deferred = Administrate::Field::Deferred.new(Administrate::Field::String)
      allow(Administrate::Field::String).to receive(:permitted_attribute)

      deferred.permitted_attribute(:foo)

      expect(Administrate::Field::String).
        to have_received(:permitted_attribute).with(:foo)
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
