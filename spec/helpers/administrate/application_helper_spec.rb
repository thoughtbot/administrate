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
      it "uses the plural of the defined translation by default" do
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

      it "uses the singular of the defined translation if specified" do
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
          displayed = display_resource_name(:customer, false)

          expect(displayed).to eq("User")
        end
      end
    end
  end
end
