require "administrate/field/date_time"
require "support/field_matchers"

describe Administrate::Field::DateTime do
  include FieldMatchers

  let :datetime_to_test do
    DateTime.new(1979,10,15,13,37)
  end

  describe "#name" do
    it "defaults to using the attribute" do
      field = Administrate::Field::DateTime.new(:datetime, datetime_to_test, :page)

      expect(field.name).to eq "datetime"
    end

    it "uses the `title` option if supplied" do
      date = datetime_with_options(datetime_to_test, title: "My Birthday")

      expect(date.name).to eq "My Birthday"
    end
  end

  describe "#to_s" do
    it "formats the sting using defaults" do
      page = :show
      field = Administrate::Field::DateTime.new(:date, datetime_to_test, page)

      expect(field.to_s).to eq "1979-10-15T13:37:00+00:00"
    end

    context "with `format` option" do
      it "displays with the given format" do
        date = datetime_with_options(datetime_to_test, format: "%Y")

        expect(date.to_s).to eq("1979")
      end
    end

    context "when data is nil" do
      it "returns an empty string" do
        field = Administrate::Field::DateTime.new(:datetime, nil, :page)

        expect(field.to_s).to eq("")
      end
    end
  end

  def datetime_with_options(datetime, options)
    Administrate::Field::DateTime.new(:datetime, datetime, :page, options)
  end
end
