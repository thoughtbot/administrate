require "rails_helper"
require "administrate/field/has_one"

describe "fields/has_one/_show", type: :view do
  context "without an associated record" do
    it "displays nothing" do
      has_one = instance_double(
        "Administrate::Field::HasOne",
        display_associated_resource: "",
        data: nil,
      )

      render(
        partial: "fields/has_one/show.html.erb",
        locals: { field: has_one },
      )

      expect(rendered.strip).to eq("")
    end
  end

  context "with an associated record" do
    it "renders a link to the record" do
      product = create(:product)
      product_path = polymorphic_path([:admin, product])
      has_one = instance_double(
        "Administrate::Field::HasOne",
        display_associated_resource: product.name,
        data: product,
        nested_show: nested_show,
      )

      render(
        partial: "fields/has_one/show.html.erb",
        locals: {
          field: has_one,
          namespace: "admin",
          resource_name: "product_meta_tag",
        },
      )

      link = "<a href=\"#{product_path}\">#{product.name}</a>"
      expect(rendered.strip).to include(link)
    end

    def nested_show
      instance_double(
        "Administrate::Page::Show",
        resource: double(
          class: ProductMetaTag,
        ),
        attributes: [],
        resource_name: "Product Tag",
      )
    end
  end
end
