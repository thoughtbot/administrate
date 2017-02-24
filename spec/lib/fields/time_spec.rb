require "spec_helper"
require "administrate/field/time"
require "support/field_matchers"

describe Administrate::Field::Time do
  include FieldMatchers

  describe "#default" do
    it "returns a formatted string of the time" do
      page = :show
      example_time = DateTime.new(2000, 1, 1, 15, 45, 33)
      field = Administrate::Field::Time.new(:owner, example_time, page)

      default = field.default

      expect(default).to eq("15:45:33")
    end
  end
end
