require "rails_helper"

RSpec.describe Administrate::ApplicationHelper do
  describe "#display_resource_name" do
    it "handles singular arguments" do
      displayed = display_resource_name(:customer, plural: true)

      expect(displayed).to eq("Customers")
    end

    it "handles string arguments" do
      displayed = display_resource_name("customer", plural: true)

      expect(displayed).to eq("Customers")
    end

    it "handles plural arguments" do
      displayed = display_resource_name(:customers, plural: true)

      expect(displayed).to eq("Customers")
    end

    it "handles namespaced resources" do
      displayed = display_resource_name("blog/posts", plural: true)

      expect(displayed).to eq("Blog Posts")
    end

    it "handles singular output" do
      displayed = display_resource_name(:customer, plural: false)

      expect(displayed).to eq("Customer")
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

      around do |example|
        with_translations(:en, translations) do
          example.run
        end
      end

      it "uses the plural of the defined translation" do
        displayed = display_resource_name(:customer, plural: true)

        expect(displayed).to eq("Users")
      end

      it "uses the singular of the defined translation" do
        displayed = display_resource_name(:customer, plural: false)

        expect(displayed).to eq("User")
      end
    end

    context "using custom dashboards" do
      it "pluralizes the resource name" do
        displayed = display_resource_name("stat", plural: true)

        expect(displayed).to eq("Stats")
      end

      it "handles plural arguments" do
        displayed = display_resource_name(:stats, plural: true)

        expect(displayed).to eq("Stats")
      end
    end
  end

  describe "#requireness" do
    let(:page) do
      Administrate::Page::Form.new(Blog::PostDashboard.new, Blog::Post.new)
    end

    it "returns 'required' if field is required" do
      title = page.attributes.detect { |i| i.attribute == :title }
      expect(requireness(title)).to eq("required")
    end

    it "returns 'optional' if field is not required" do
      publish_at = page.attributes.detect { |i| i.attribute == :published_at }
      expect(requireness(publish_at)).to eq("optional")
    end
  end

  describe "#has_presence_validator?" do
    it "returns true if field is required" do
      required = has_presence_validator?(Blog::Post, :title)
      expect(required).to eq(true)
    end

    it "returns false if field is not required" do
      required = has_presence_validator?(Blog::Post, :publish_at)
      expect(required).to eq(false)
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
