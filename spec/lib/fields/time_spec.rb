require "rails_helper"
require "administrate/field/time"

describe Administrate::Field::Time do
  let(:page) { :show }
  let(:time) { Time.zone.local(2000, 1, 1, 15, 45, 33) }
  let(:field) do
    field = Administrate::Field::Time.new(:time, time, page)
  end

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      path = field.to_partial_path

      expect(path).to eq("/fields/time/#{page}")
    end
  end

  describe "#short_plain_text" do
    it "returns time in format 'hh:mm am/pm'" do
      expect(field.short_plain_text).to eq time.strftime("%I:%M%p").to_s
    end
  end
end
