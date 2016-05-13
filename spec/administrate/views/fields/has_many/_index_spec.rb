require "rails_helper"

describe "fields/has_many/_index", type: :view do
  context "without an associated record" do
    it "renders a plural description" do
      has_many = instance_double(
        "Administrate::Field::HasMany",
        attribute: 'products',
        data: []
      )

      render(
        partial: "fields/has_many/index.html.erb",
        locals: { field: has_many },
      )

      expect(rendered.strip).to eq("0 products")
    end
  end

  context "with one associated record" do
    it "renders a singular description" do
      product = create(:product)
      has_many = instance_double(
        "Administrate::Field::HasMany",
        attribute: :products,
        data: [product]
      )

      render(
        partial: "fields/has_many/index.html.erb",
        locals: { field: has_many },
      )

      expect(rendered.strip).to eq("1 product")
    end
  end

  context "with more than one associated record" do
    it "renders a plural description" do
      products = create_list(:product, 3)
      has_many = instance_double(
        "Administrate::Field::HasMany",
        attribute: :products,
        data: products
      )

      render(
        partial: "fields/has_many/index.html.erb",
        locals: { field: has_many },
      )

      expect(rendered.strip).to eq("3 products")
    end
  end
end
