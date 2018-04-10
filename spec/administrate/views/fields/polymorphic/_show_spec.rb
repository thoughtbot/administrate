require "rails_helper"
require "administrate/field/belongs_to"
require "administrate/field/polymorphic"

describe "fields/polymorphic/_show", type: :view do
  context "without an associated records" do
    it "displays nothing" do
      polymorphic = instance_double(
        "Administrate::Field::Polymorphic",
        display_associated_resource: "",
        data: nil,
      )

      render(
        partial: "fields/polymorphic/show.html.erb",
        locals: { field: polymorphic },
      )

      expect(rendered.strip).to eq("")
    end
  end

  context "without valid show action" do
    it "renders record without a link" do
      product = create(:product)
      polymorphic = instance_double(
        "Administrate::Field::Polymorphic",
        display_associated_resource: product.name,
        associated_class: "Product",
        data: product,
        attribute: "product",
      )
      allow(view).to receive(:valid_action?).and_return(false)

      render(
        partial: "fields/polymorphic/show.html.erb",
        locals: { field: polymorphic, namespace: "admin" },
      )

      expect(rendered.strip).to eq(product.name)
    end
  end

  context "with an associated record" do
    it "renders a link to the record" do
      product = create(:product)
      product_path = polymorphic_path([:admin, product])
      polymorphic = instance_double(
        "Administrate::Field::Polymorphic",
        display_associated_resource: product.name,
        associated_class: "Product",
        data: product,
        attribute: "product",
      )
      allow(view).to receive(:valid_action?).and_return(true)

      render(
        partial: "fields/polymorphic/show.html.erb",
        locals: { field: polymorphic, namespace: "admin" },
      )

      expected = "<a href=\"#{product_path}\">#{product.name}</a>"
      expect(rendered.strip).to eq(expected)
    end
  end
end
