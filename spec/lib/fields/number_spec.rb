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

  it { should_permit_param(:foo, for_attribute: :foo) }

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
        number = Administrate::Field::Number.new(:number, 12.123456, :page)
        expect(number.to_s).to eq("12.123456")
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
