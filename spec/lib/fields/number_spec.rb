require "rails_helper"
require "administrate/field/number"
require "support/field_matchers"

describe Administrate::Field::Number do
  include FieldMatchers

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      number = double
      field = Administrate::Field::Number.new(:price, number, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/number/#{page}")
    end
  end

  it do
    should_permit_param(
      "foo",
      on_model: Customer,
      for_attribute: :foo,
    )
  end

  describe "#to_s" do
    it "defaults to displaying no decimal points" do
      int = Administrate::Field::Number.new(:quantity, 3, :show)
      expect(int.to_s).to eq("3")
    end

    context "with `prefix` option" do
      it "displays the given prefix" do
        number = number_with_options(13, prefix: "$")

        expect(number.to_s).to eq("$13")
      end
    end

    context "with `suffix` option" do
      it "displays the given suffix" do
        number = number_with_options(13, suffix: "h")

        expect(number.to_s).to eq("13h")
      end
    end

    context "with `decimals` option" do
      it "truncates the number to the given number of decimal places" do
        zero = number_with_options(12.34553, decimals: 0)
        three = number_with_options(12.34553, decimals: 3)
        six = number_with_options(12.34553, decimals: 6)

        expect(zero.to_s).to eq("12")
        expect(three.to_s).to eq("12.346")
        expect(six.to_s).to eq("12.345530")
      end

      it "fills in missing decimals with zeros" do
        number = number_with_options(12, decimals: 2)

        expect(number.to_s).to eq("12.00")
      end

      it "defaults to the precision of the decimal" do
        float = Administrate::Field::Number.new(:number, 12.123456, :page)
        big_decimal = Administrate::Field::Number.new(:number, 0.26186536e2, :page)

        expect(float.to_s).to eq("12.123456")
        expect(big_decimal.to_s).to eql("26.186536")
      end
    end

    context "with `multiplier` option" do
      it "multiples the number by the given multiplier" do
        hundredth = number_with_options(100, multiplier: 0.01)
        ten = number_with_options(100, multiplier: 10)

        expect(hundredth.to_s).to eq("1")
        expect(ten.to_s).to eq("1000")
      end
    end

    context "with `format` option" do
      context "when `formatter: :number_to_delimited`" do
        it "includes the delimiter for numbers greater than 999" do
          ninety_nine = number_with_options(
            999, format: { formatter: :number_to_delimited }
          )
          thousand_default = number_with_options(
            1_000, format: { formatter: :number_to_delimited }
          )
          thousand_explicit_comma = number_with_options(
            1_000, format: {
              formatter: :number_to_delimited,
              formatter_options: { delimiter: "," },
            }
          )
          million_explicit_space = number_with_options(
            1_000_000, format: {
              formatter: :number_to_delimited,
              formatter_options: { delimiter: " " },
            }
          )

          expect(ninety_nine.to_s).to eq("999")
          expect(thousand_default.to_s).to eq("1,000")
          expect(thousand_explicit_comma.to_s).to eq("1,000")
          expect(million_explicit_space.to_s).to eq("1 000 000")
        end
      end

      context "when `formatter: :number_to_currency`" do
        it "includes the currency" do
          with_currency = number_with_options(
            100, format: { formatter: :number_to_currency }
          )
          expect(with_currency.to_s).to eq("$100.00")
        end
      end

      context "when passed incorrect `formatter`" do
        it "works" do
          thousand = number_with_options(1_000, format: { formatter: :rubbish })

          expect(thousand.to_s).to eq("1000")
        end
      end
    end

    context "with multiple options" do
      it "correctly displays the number with all options applied" do
        options = {
          prefix: "$",
          suffix: "/hour",
          multiplier: 10,
          decimals: 2,
          format: {
            formatter: :number_to_delimited,
            formatter_options: {
              delimiter: " ",
              separator: ",",
            },
          },
        }
        number = number_with_options(100, **options)

        expect(number.to_s).to eq("$1 000,00/hour")
      end
    end

    context "when data is nil" do
      it "returns a dash" do
        number = Administrate::Field::Number.new(:number, nil, :page)

        expect(number.to_s).to eq("-")
      end
    end

    def number_with_options(num, options)
      Administrate::Field::Number.new(:number, num, :page, options)
    end
  end
end
