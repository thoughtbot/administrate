require "rails_helper"
require "administrate/field/time"

describe Administrate::Field::Time do
  describe "#partial_prefixes" do
    it "returns a partial based on the page being rendered" do
      page = :show
      time = Time.zone.local(2000, 1, 1, 15, 45, 33)
      field = Administrate::Field::Time.new(:time, time, page)

      prefixes = field.partial_prefixes

      expect(prefixes).to eq(["fields/time", "fields/base"])
    end
  end

  describe "#time" do
    it "formats the time according to the passed format option" do
      time = DateTime.new(2021, 3, 26, 16, 38)
      formats = {
        time: {
          formats: {short: "%H:%M"}
        }
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

  it "formats the time with localized AM/PM markers" do
    time = DateTime.new(2021, 3, 26, 16, 38)
    formats = {
      time: {
        am: "午前",
        pm: "午後"
      }
    }

    field = Administrate::Field::Time.new(:time, time, :index)

    I18n.with_locale(:ja) do
      with_translations(:ja, formats) do
        expect(field.time).to eq("04:38午後")
      end
    end
  end

  it "returns a missing translation message if the translation is not available" do
    time = DateTime.new(2021, 3, 26, 16, 38)
    field = Administrate::Field::Time.new(:time, time, :index)
    formats = {}

    I18n.with_locale(:ja) do
      with_translations(:ja, formats) do
        expect(field.time).to eq("Translation missing: ja.time.pm")
      end
    end
  end
end
