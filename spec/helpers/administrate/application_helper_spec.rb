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
      it "returns the name defined in the dashboard" do
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

  describe "#administrate_valid_action?" do
    context "when given a string target" do
      it "checks the class it names with `valid_action?` and `show_action?`" do
        class TestCustomResource; end
        ctx = double(valid_action?: true, show_action?: true)
        ctx.extend(Administrate::ApplicationHelper)

        result = ctx.administrate_valid_action?("test_custom_resource", "foo")

        expect(ctx).to have_received(:valid_action?).with("foo", TestCustomResource)
        expect(ctx).to have_received(:show_action?).with("foo", TestCustomResource)
      ensure
        remove_constants :TestCustomResource
      end
    end

    context "when given a symbol target" do
      it "checks the class it names with `valid_action?` and `show_action?`" do
        class TestCustomResource; end
        ctx = double(valid_action?: true, show_action?: true)
        ctx.extend(Administrate::ApplicationHelper)

        ctx.administrate_valid_action?(:test_custom_resource, "foo")

        # Using a symbol instead of a class is allowed for both methods
        expect(ctx).to have_received(:valid_action?).with("foo", :test_custom_resource)
        expect(ctx).to have_received(:show_action?).with("foo", :test_custom_resource)
      ensure
        remove_constants :TestCustomResource
      end
    end

    context "when given a class target" do
      it "checks it with `valid_action?` and `show_action?`" do
        class TestCustomResource; end
        ctx = double(valid_action?: true, show_action?: true)
        ctx.extend(Administrate::ApplicationHelper)

        ctx.administrate_valid_action?(TestCustomResource, "foo")

        expect(ctx).to have_received(:valid_action?).with("foo", TestCustomResource)
        expect(ctx).to have_received(:show_action?).with("foo", TestCustomResource)
      ensure
        remove_constants :TestCustomResource
      end
    end

    context "when given an ActiveRecord::Base target" do
      it "checks its class with `valid_action?` and the object with `show_action?`" do
        ctx = double(valid_action?: true, show_action?: true)
        ctx.extend(Administrate::ApplicationHelper)

        object = Product.new
        ctx.administrate_valid_action?(object, "foo")

        expect(ctx).to have_received(:valid_action?).with("foo", Product)
        expect(ctx).to have_received(:show_action?).with("foo", object)
      end
    end

    context "when given an object target" do
      it "checks its class with `valid_action?` and the object with `show_action?`" do
        class TestCustomResource; end
        ctx = double(valid_action?: true, show_action?: true)
        ctx.extend(Administrate::ApplicationHelper)

        object = TestCustomResource.new
        ctx.administrate_valid_action?(object, "foo")

        expect(ctx).to have_received(:valid_action?).with("foo", TestCustomResource)
        expect(ctx).to have_received(:show_action?).with("foo", object)
      ensure
        remove_constants :TestCustomResource
      end
    end
  end
end
