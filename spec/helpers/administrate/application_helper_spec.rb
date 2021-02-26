require "rails_helper"

RSpec.describe Administrate::ApplicationHelper do
  describe "#display_resource_name" do
    it "defaults to the plural of the model name" do
      displayed = display_resource_name(:customer)

      expect(displayed).to eq("Customers")
    end

    it "can return singular of the model name" do
      displayed = display_resource_name(:customer, singular: true)

      expect(displayed).to eq("Customer")
    end

    it "handles string arguments" do
      displayed = display_resource_name("customer")

      expect(displayed).to eq("Customers")
    end

    it "handles plural arguments" do
      displayed = display_resource_name(:customers)

      expect(displayed).to eq("Customers")
    end

    it "handles namespaced resources" do
      displayed = display_resource_name("blog/posts")

      expect(displayed).to eq("Blog Posts")
    end

    context "when translations are defined" do
      let(:translations) do
        {
          activerecord: {
            models: {
              customer: {
                one: "User",
                other: "Users",
              },
            },
          },
        }
      end

      it "uses the plural of the defined translation as default" do
        with_translations(:en, translations) do
          displayed = display_resource_name(:customer)

          expect(displayed).to eq("Users")
        end
      end

      it "uses the singular of the defined translation" do
        with_translations(:en, translations) do
          displayed = display_resource_name(:customer, singular: true)

          expect(displayed).to eq("User")
        end
      end
    end

    context "using custom dashboards" do
      it "pluralizes the resource name" do
        displayed = display_resource_name("stat")

        expect(displayed).to eq("Stats")
      end

      it "handles plural arguments" do
        displayed = display_resource_name(:stats)

        expect(displayed).to eq("Stats")
      end
    end
  end

  describe "#requireness" do
    let(:page) do
      Administrate::Page::Form.new(ProductDashboard.new, Product.new)
    end

    it "returns 'required' if field is required" do
      name = page.attributes.detect { |i| i.attribute == :name }
      expect(requireness(name)).to eq("required")
    end

    it "returns 'optional' if field is not required" do
      release_year = page.attributes.detect { |i| i.attribute == :release_year }
      expect(requireness(release_year)).to eq("optional")
    end
  end

  describe "#sort_order" do
    it "sanitizes to ascending/descending/none" do
      expect(sort_order("asc")).to eq("ascending")
      expect(sort_order("desc")).to eq("descending")
      expect(sort_order("for anything else")).to eq("none")
    end
  end
end
