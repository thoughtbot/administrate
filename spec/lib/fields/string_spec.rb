require "spec_helper"
require "administrate/fields/string"
require "support/field_matchers"

describe Administrate::Field::String do
  include FieldMatchers

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::String.new(:string, "hello", page)

      path = field.to_partial_path

      expect(path).to eq("/fields/string/#{page}")
    end
  end

  it { should_permit_param(:foo, for_attribute: :foo) }
end
