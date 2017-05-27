require "rails_helper"
require "administrate/field/time"

describe Administrate::Field::Time do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      time = Time.zone.local(2000, 1, 1, 15, 45, 33)
      field = Administrate::Field::Time.new(:time, time, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/time/#{page}")
    end
  end
end
