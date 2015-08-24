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
end
