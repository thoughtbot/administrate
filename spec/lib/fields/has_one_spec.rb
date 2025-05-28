require "administrate/field/has_one"
require "support/constant_helpers"
require "rails_helper"
require "administrate/resource_resolver"
require "administrate/page"
require "administrate/page/form"

describe Administrate::Field::HasOne do
  describe "#nested_form" do
    it "returns a form" do
      resource = build(:product)
      value = double
      field = Administrate::Field::HasOne.new(
        :product_meta_tag,
        value,
        :show,
        resource: resource
      )

      form = field.nested_form

      expect(form).to be_present
    end
  end

  describe "#nested_show" do
    it "returns a Show" do
      product = create(:product)
      product_meta_tag = double
      field = Administrate::Field::HasOne.new(
        :product_meta_tag,
        product_meta_tag,
        :show,
        resource: product
      )

      show = field.nested_show

      expect(show).to be_a(Administrate::Page::Show)
    end
  end

  describe ".permitted_attribute" do
    context "with custom class_name" do
      it "returns attributes from correct dashboard" do
        field = Administrate::Field::Deferred.new(
          Administrate::Field::HasOne,
          class_name: :product_meta_tag
        )

        field_name = "product_meta_tag"
        attributes = field.permitted_attribute(
          field_name,
          resource_class: Product
        )
        expect(attributes[:"#{field_name}_attributes"])
          .to eq(%i[meta_title meta_description id])
      end
    end
  end

  describe "#partial_prefixes" do
    it "returns a partial based on the page being rendered" do
      resource = double
      page = :show
      value = double
      field = Administrate::Field::HasOne.new(
        :product_meta_tag,
        value,
        page,
        resource: resource
      )

      prefixes = field.partial_prefixes

      expect(prefixes).to eq(["fields/has_one", "fields/associative", "fields/base"])
    end
  end

  describe "#linkable?" do
    context "when data is persisted" do
      it "shows it" do
        product_meta_tag = create(:product_meta_tag)
        field = described_class.new(
          :product_meta_tag,
          product_meta_tag,
          :show
        )

        expect(field).to be_linkable
      end
    end

    context "when data isn't persisted" do
      it "doesn't shows it" do
        product_meta_tag = build(:product_meta_tag)
        field = described_class.new(
          :product_meta_tag,
          product_meta_tag,
          :show
        )

        expect(field).to_not be_linkable
      end
    end

    context "when data doesn't respond to `persisted?`" do
      it "doesn't show it" do
        product_meta_tag = double(:product_meta_tag)
        field = described_class.new(
          :product_meta_tag,
          product_meta_tag,
          :show
        )

        expect(field).not_to be_linkable
      end
    end
  end
end
