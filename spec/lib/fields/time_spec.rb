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

  describe "#time" do
    it "formats the time according to the passed format option" do
      time = DateTime.new(2021, 3, 26, 16, 38)
      formats = {
        time: {
          formats: { short: "%H:%M" },
        },
      }

      options_field = Administrate::Field::Time.with_options(format: :short)
      field = options_field.new(:time, time, :index)

      with_translations(:en, formats) do
        expect(field.time).to eq("16:38")
      end
    end

    it "it defaults to the expected format if no format option is passed" do
      time = DateTime.new(2021, 3, 26, 16, 38)
      field = Administrate::Field::Time.new(:time, time, :index)

      expect(field.time).to eq("04:38PM")
    end
  end
end
