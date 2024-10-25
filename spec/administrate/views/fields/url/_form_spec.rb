require "rails_helper"
require "administrate/field/url"

describe "fields/url/_form", type: :view do
  it "provides the correct name for the field" do
    product = build(:product, image_url: nil)
    url = instance_double(
      "Administrate::Field::Url",
      attribute: :image_url,
      data: nil
    )

    fields model: product do |f|
      render(
        partial: "fields/url/form",
        locals: {field: url, f: f}
      )
    end

    expect(rendered).to have_css(%(input[type="url"][name="product[image_url]"]))
  end
end
