require "rails_helper"

describe "fields/has_one/_index", type: :view do
  context "without an associated record" do
    it "displays nothing" do
      has_one = double(data: nil)

      render(
        partial: "fields/has_one/index.html.erb",
        locals: { field: has_one },
      )

      expect(rendered.strip).to eq("")
    end
  end

  context "without valid show action" do
    it "renders record without a link" do
      product = create(:product)
      has_one = instance_double(
        "Administrate::Field::HasOne",
        data: product,
        display_associated_resource: product.name,
        associated_class: "Product",
      )
      allow(view).to receive(:valid_action?).and_return(false)

      render(
        partial: "fields/has_one/index.html.erb",
        locals: { field: has_one, namespace: "admin" },
      )

      expect(rendered.strip).to eq(product.name)
    end
  end

  context "with an associated record" do
    it "renders a link to the record" do
      product = create(:product)
      product_path = polymorphic_path([:admin, product])
      has_one = instance_double(
        "Administrate::Field::HasOne",
        data: product,
        display_associated_resource: product.name,
        associated_class: "Product",
      )
      allow(view).to receive(:valid_action?).and_return(true)

      render(
        partial: "fields/has_one/index.html.erb",
        locals: { field: has_one, namespace: "admin" },
      )

      expected = "<a href=\"#{product_path}\">#{product.name}</a>"
      expect(rendered.strip).to eq(expected)
    end
  end
end
