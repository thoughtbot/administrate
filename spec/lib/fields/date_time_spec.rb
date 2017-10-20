require "rails_helper"
require "administrate/field/date_time"

describe Administrate::Field::DateTime do
  let(:start_date) { DateTime.parse("2015-12-25 10:15:45") }
  let(:formats) do
    {
      date: {
        formats: { default: "%m/%d/%Y", short: "%b %d" },
        abbr_month_names: Array.new(13) { |i| "Dec" if i == 12 },
        abbr_day_names: Array.new(7) { |i| "Fri" if i == 5 },
      },
      time: {
        formats: { default: "%a, %b %-d, %Y at %r", short: "%d %b %H:%M" },
      },
    }
  end

  describe "#date" do
    it "displays the date" do
      with_translations(:en, formats) do
        field = Administrate::Field::DateTime.
          new(:start_date, start_date, :show)
        expect(field.date).to eq("12/25/2015")
      end
    end

    context "with `prefix` option" do
      it "displays the date in the requested format" do
        options_field = Administrate::Field::DateTime.
          with_options(format: :short)
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.date).to eq("Dec 25")
        end
      end

      it "displays the date using a format string" do
        options_field = Administrate::Field::DateTime.
          with_options(format: "%Y")
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.date).to eq("2015")
        end
      end
    end

    context "with `timezone` option set to New York & early DateTime" do
      it "displays previous day because of the time difference" do
        start_date = DateTime.parse("2015-12-25 02:15:45")
        options_field = Administrate::Field::DateTime.
          with_options(format: :short, timezone: "America/New_York")
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.date).to eq("Dec 24")
        end
      end
    end
  end

  describe "#datetime" do
    it "displays the datetime" do
      field = Administrate::Field::DateTime.new(:start_date, start_date, :show)

      with_translations(:en, formats) do
        expect(field.datetime).to eq("Fri, Dec 25, 2015 at 10:15:45 AM")
      end
    end

    context "with `prefix` option" do
      it "displays the datetime in the requested format" do
        options_field = Administrate::Field::DateTime.
          with_options(format: :short)
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.datetime).to eq("25 Dec 10:15")
        end
      end

      it "displays the datetime format string" do
        options_field = Administrate::Field::DateTime.
          with_options(format: "%H:%M")
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.datetime).to eq("10:15")
        end
      end
    end

    context "with `timezone` option" do
      it "displays the datetime for the specified timezone" do
        options_field = Administrate::Field::DateTime.
          with_options(format: "%H:%M", timezone: "America/New_York")
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.datetime).to eq("05:15")
        end
      end
    end
  end
end
