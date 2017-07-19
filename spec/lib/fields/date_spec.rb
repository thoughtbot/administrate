require "rails_helper"
require "administrate/field/date"

describe Administrate::Field::Date do
  let(:start_date) { DateTime.parse("2015-12-25") }
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
        field = Administrate::Field::Date.new(:start_date, start_date, :show)
        expect(field.date).to eq("12/25/2015")
      end
    end

    context "with `prefix` option" do
      it "displays the date in the requested format" do
        options_field = Administrate::Field::Date.with_options(format: :short)
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.date).to eq("Dec 25")
        end
      end

      it "displays the date using a format string" do
        options_field = Administrate::Field::Date.with_options(format: "%Y")
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.date).to eq("2015")
        end
      end
    end
  end
end
