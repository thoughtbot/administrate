require "rails_helper"

RSpec.describe Administrate::ApplicationHelper do
  describe "#display_resource_name" do
    it "defaults to the plural of the model name" do
      displayed = display_resource_name(:customer)

      expect(displayed).to eq("Customers")
    end

    it "handles string arguments" do
      displayed = display_resource_name("customer")

      expect(displayed).to eq("Customers")
    end

    it "handles plural arguments" do
      displayed = display_resource_name(:customers)

      expect(displayed).to eq("Customers")
    end

    context "when translations are defined" do
      it "uses the plural of the defined translation" do
        translations = {
          activerecord: {
            models: {
              customer: {
                one: "User",
                other: "Users",
              },
            },
          },
        }

        with_translations(:en, translations) do
          displayed = display_resource_name(:customer)

          expect(displayed).to eq("Users")
        end
      end
    end
  end

  describe "#svg_tag" do
    it "returns use tag with svg file path in xlink:href attribute" do
      use_tag = build_svg_tag.xpath("//svg//use['xlink:href']")

      expect(use_tag.size).to eq(1)
      expect(use_tag[0].attributes["xlink:href"].value).to eq("/logo.svg#logo")
    end

    context "with size attributes" do
      it "returns use tag with height" do
        svg_tag = build_svg_tag(height: 15)
        use_tag = svg_tag.xpath("//svg//use['height']")
        attribute = use_tag[0].attributes["height"]

        expect(attribute.value).to eq("15")
      end

      it "returns use tag with width" do
        svg_tag = build_svg_tag(width: 20)
        use_tag = svg_tag.xpath("//svg//use['width']")
        attribute = use_tag[0].attributes["width"]

        expect(attribute.value).to eq("20")
      end
    end

    def build_svg_tag(options = {})
      Nokogiri::HTML svg_tag("logo.svg", "logo", options)
    end
  end
end
