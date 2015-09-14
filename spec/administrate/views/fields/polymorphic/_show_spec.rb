require "rails_helper"

describe "fields/polymorphic/_show", type: :view do
  context "without an associated records" do
    it "displays nothing" do
      polymorphic = double(data: nil)

      render(
        partial: "fields/polymorphic/show.html.erb",
        locals: { field: polymorphic },
      )

      expect(rendered.strip).to eq("")
    end
  end

  context "with an associated record" do
    it "renders a link to the record" do
      product = create(:product)
      polymorphic = double(data: product)
      product_path = polymorphic_path([:admin, product])

      render(
        partial: "fields/polymorphic/show.html.erb",
        locals: { field: polymorphic },
      )

      expect(rendered.strip).to eq("<a href=\"#{product_path}\">#{product}</a>")
    end
  end
end
