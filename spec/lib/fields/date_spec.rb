require "rails_helper"
require "administrate/field/date"

describe Administrate::Field::Date do
  let(:start_date) { Date.parse("2015-12-25") }
  let(:formats) do
    {
      date: {
        formats: {
          default: "%m/%d/%Y",
          short: "%b %d",
          administrate_date_default: "%m/%d, %Y"
        },
        abbr_month_names: Array.new(13) { |i| "Dec" if i == 12 },
        abbr_day_names: Array.new(7) { |i| "Fri" if i == 5 }
      },
      time: {
        formats: {
          default: "%a, %b %-d, %Y at %r",
          short: "%d %b %H:%M",
          administrate_datetime_default: "%a, %b %-d, %Y, %r",
          administrate_time_default: "%I:%M%p"
        }
      }
    }
  end
  let(:formats_without_administrate_default) do
    {
      date: {
        formats: {
          default: "%m/%d/%Y",
          short: "%b %d"
        },
        abbr_month_names: Array.new(13) { |i| "Dec" if i == 12 },
        abbr_day_names: Array.new(7) { |i| "Fri" if i == 5 }
      },
      time: {
        formats: {
          default: "%a, %b %-d, %Y at %r",
          short: "%d %b %H:%M"
        }
      }
    }
  end

  describe "#date" do
    it "displays the date" do
      with_translations(:en, formats) do
        field = Administrate::Field::Date
          .new(:start_date, start_date, :show)
        expect(field.date).to eq("12/25, 2015")
      end
    end

    context "with `format` option" do
      it "displays the date in the requested format" do
        options_field = Administrate::Field::Date
          .with_options(format: :short)
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.date).to eq("Dec 25")
        end
      end

      it "displays the date using a format string" do
        options_field = Administrate::Field::Date
          .with_options(format: "%Y")
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.date).to eq("2015")
        end
      end
    end

    context "without `format` option" do
      it "falls back to default format if administrate_date_default is missing" do
        options_field = Administrate::Field::Date
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats_without_administrate_default) do
          expect(field.date).to eq("12/25/2015")
        end
      end

      it "falls back to static format (%Y-%m-%d) if locale formats are missing" do
        options_field = Administrate::Field::Date
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:unformatted_locale, {}) do
          available_locales = I18n.available_locales
          locale = I18n.locale
          begin
            I18n.available_locales = [:unformatted_locale]
            I18n.locale = :unformatted_locale
            expect(field.date).to eq("2015-12-25")
          ensure
            I18n.available_locales = available_locales
            I18n.locale = locale
          end
        end
      end
    end
  end
end
