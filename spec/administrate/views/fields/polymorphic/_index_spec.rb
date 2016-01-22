require "rails_helper"

describe "fields/polymorphic/_index", type: :view do
  context "without an associated records" do
    it "displays nothing" do
      polymorphic = double(data: nil)

      render(
        partial: "fields/polymorphic/index.html.erb",
        locals: { field: polymorphic },
      )

      expect(rendered.strip).to eq("")
    end
  end

  context "with an associated record" do
    it "renders a link to the record" do
      product = create(:product)
      product_path = polymorphic_path([:admin, product])
      polymorphic = instance_double(
        "Administrate::Field::Polymorphic",
        data: product,
        display_associated_resource: product.name,
      )

      render(
        partial: "fields/polymorphic/index.html.erb",
        locals: { field: polymorphic, namespace: "admin" },
      )

      expected = "<a href=\"#{product_path}\">#{product.name}</a>"
      expect(rendered.strip).to eq(expected)
    end
  end
end
