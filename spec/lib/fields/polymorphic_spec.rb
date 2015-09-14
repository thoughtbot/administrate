require "spec_helper"
require "administrate/fields/polymorphic"
require "support/field_matchers"

describe Administrate::Field::Polymorphic do
  include FieldMatchers

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::Polymorphic.new(:foo, "hello", page)

      path = field.to_partial_path

      expect(path).to eq("/fields/polymorphic/#{page}")
    end
  end

  it { should_permit_param(:foo, for_attribute: :foo) }
end
