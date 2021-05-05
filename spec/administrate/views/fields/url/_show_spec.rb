require "rails_helper"

describe "fields/url/_show", type: :view do
  it "renders url" do
    product = create(:product, image_url: "https://thoughtbot.com/image.jpg")
    url = instance_double(
      "Administrate::Field::Url",
      data: product.image_url,
      attribute: :image_url,
    )

    render(
      partial: "fields/url/show",
      locals: { field: url, namespace: :admin },
    )

    expect(rendered).to have_css(
      %{a[href="#{product.image_url}"]},
      text: product.image_url,
    )
  end
end
