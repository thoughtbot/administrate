require "rails_helper"
require "administrate/field/base"
require "administrate/field/rich_text"

include ActionText::Engine.helpers

def main_app
  AdministratePrototype::Application.routes.default_url_options = {
    host: "www.example.com"
  }
  AdministratePrototype::Application.routes.url_helpers
end

describe "fields/rich_text/_form", type: :view do
  it "sets up the rich text field" do
    stub_const(
      "ProductDashbard::ATTRIBUTE_TYPES",
      banner: Administrate::Field::RichText
    )
    product = build(:product, banner: "<div>Rich text</div>")
    banner = instance_double(
      "Administrate::Field::RichText",
      attribute: :banner,
      data: product.banner
    )

    fields model: product do |f|
      render(
        partial: "fields/rich_text/form",
        locals: {field: banner, f: f}
      )
    end

    expect(rendered).to have_field(
      "trix_input_product", type: "hidden", with: product.banner.body.to_trix_html
    ).and(have_element(
      "trix-editor", input: "trix_input_product"
    ))
  end
end
