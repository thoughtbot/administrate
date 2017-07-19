require "rails_helper"
require "administrate/field/time"

describe Administrate::Field::Time do
  let(:start_date) { DateTime.parse("2015-12-25 10:15:45") }
  let(:formats) do
    {
      date: {
        formats: { default: "%m/%d/%Y", short: "%b %d" },
        abbr_month_names: Array.new(13) { |i| "Dec" if i == 12 },
        abbr_day_names: Array.new(7) { |i| "Fri" if i == 5 },
      },
      time: {
        formats: {
          default: "%r",
          short: "%H:%M",
          time_without_date: "%H:%M:%S",
        },
      },
    }
  end

  describe "#time" do
    it "displays the time" do
      field = Administrate::Field::Time.new(:start_date, start_date, :show)

      with_translations(:en, formats) do
        expect(field.time).to eq("10:15:45")
      end
    end

    context "with `prefix` option" do
      it "displays the time in the requested format" do
        options_field = Administrate::Field::Time.with_options(format: :short)
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.time).to eq("10:15")
        end
      end

      it "displays the time format string" do
        options_field = Administrate::Field::Time.with_options(format: "%H:%M")
        field = options_field.new(:start_date, start_date, :show)

        with_translations(:en, formats) do
          expect(field.time).to eq("10:15")
        end
      end
    end
  end
end
