require "rails_helper"
require "administrate/field/has_one"

describe "fields/has_one/_show", type: :view do
  before do
    allow(view).to receive(:accessible_action?).and_return(true)
  end

  context "without an associated record" do
    it "displays nothing" do
      has_one = Administrate::Field::HasOne.new(
        :product_meta_tag,
        build(:product_meta_tag),
        :show,
      )

      render(
        partial: "fields/has_one/show",
        locals: { field: has_one },
      )

      expect(rendered.strip).to eq("")
    end
  end

  context "with an associated record" do
    context "when linking the record is allowed" do
      it "renders a link to the record" do
        product = create(:product)
        product_path = polymorphic_path([:admin, product])
        nested_show = instance_double(
          "Administrate::Page::Show",
          resource: double(
            class: ProductMetaTag,
          ),
          attributes: [],
          resource_name: "Product Tag",
        )
        has_one = instance_double(
          "Administrate::Field::HasOne",
          display_associated_resource: product.name,
          data: product,
          linkable?: true,
          nested_show: nested_show,
        )

        render(
          partial: "fields/has_one/show",
          locals: {
            field: has_one,
            namespace: :admin,
            resource_name: "product_meta_tag",
          },
        )

        link = "<a href=\"#{product_path}\">#{product.name}</a>"
        expect(rendered.strip).to include(link)
      end

      it "renders nested attribute relationships" do
        view.extend Administrate::ApplicationHelper

        product = create(:product)
        page = create(:page, product: product)

        nested_has_many = instance_double(
          "Administrate::Field::HasMany",
          associated_collection: [page],
          attribute: :page,
          data: [page],
          resources: [page],
          html_class: "has-many",
          name: "Page",
          to_partial_path: "fields/has_many/index",
          order_from_params: {},
        )

        nested_show = instance_double(
          "Administrate::Page::Show",
          resource: double(
            class: ProductMetaTag,
          ),
          attributes: [nested_has_many],
          resource_name: "Product Tag",
        )

        has_one = instance_double(
          "Administrate::Field::HasOne",
          display_associated_resource: product.name,
          data: product,
          linkable?: true,
          nested_show: nested_show,
        )

        page_double = instance_double("Administrate::Page::Show")

        render(
          partial: "fields/has_one/show",
          locals: {
            field: has_one,
            namespace: :admin,
            page: page_double,
            resource_name: "product_meta_tag",
          },
        )

        has_many_count = "1 page"
        expect(rendered.strip).to include(has_many_count)
      end
    end

    context "when linking the record is not allowed" do
      it "displays the record without a link" do
        allow(view).to receive(:accessible_action?).and_return(false)
        product = create(:product)
        nested_show = instance_double(
          "Administrate::Page::Show",
          resource: double(
            class: ProductMetaTag,
          ),
          attributes: [],
          resource_name: "Product Tag",
        )
        has_one = instance_double(
          "Administrate::Field::HasOne",
          display_associated_resource: product.name,
          data: product,
          linkable?: true,
          nested_show: nested_show,
        )

        render(
          partial: "fields/has_one/show",
          locals: {
            field: has_one,
            namespace: :admin,
            resource_name: "product_meta_tag",
          },
        )

        expect(rendered.strip).to include(product.name)
        expect(rendered.strip).not_to include("<a ")
      end
    end
  end
end
