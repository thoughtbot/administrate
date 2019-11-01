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
        nested_form: nested_form,
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
      field_name = "Meta Title"
      field_value = "Very Nice Title"
      expect(rendered.strip).to include(link)
      expect(rendered.strip).to include(field_name)
      expect(rendered.strip).to include(field_value)
    end

    def nested_form
      instance_double(
        "Administrate::Page::Show",
        resource: double(
          class: ProductMetaTag,
        ),
        attributes: [double(
          html_class: "string",
          name: "meta_title",
          data: "Very Nice Title",
        )],
        resource_name: "Product Tag",
      )
    end
  end
end
