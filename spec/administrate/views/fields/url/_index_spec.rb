require "rails_helper"

describe "fields/url/_index", type: :view do
  let(:product) do
    build(:product, image_url: "https://thoughtbot.com/image-but-extremely-long-and-should-be-truncated.jpg")
  end

  it "renders url" do
    url = instance_double(
      "Administrate::Field::Url",
      data: product.image_url,
      truncate: product.image_url[0..50],
      html_options: {}
    )

    render(
      partial: "fields/url/index",
      locals: {field: url, namespace: :admin}
    )

    expect(rendered).to have_css(
      %(a[href="#{product.image_url}"]),
      text: product.image_url[0..50]
    )
  end

  it "renders html options" do
    url = instance_double(
      "Administrate::Field::Url",
      data: product.image_url,
      truncate: product.image_url,
      html_options: {referrerpolicy: "no-referrer"}
    )

    render(
      partial: "fields/url/show",
      locals: {field: url, namespace: :admin}
    )

    expect(rendered).to have_css(
      %(a[href="#{product.image_url}"][referrerpolicy="no-referrer"]),
      text: product.image_url
    )
  end
end
