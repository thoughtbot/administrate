require "rails_helper"
require "administrate/field/attached/one"

describe "fields/attached/one/_show", type: :view do
  it "renders a 'No attachment' when missing a value" do
    field = instance_double(
      "Administrate::Field::Attached::One",
      attached?: false
    )

    render(partial: "fields/attached/one/show", locals: {field: field})

    expect(rendered).to have_text("No attachment")
  end

  it "renders a preview when attached" do
    model = build(:product, hero_image: file_fixture("image.png"))
    field = instance_double(
      "Administrate::Field::Attached::One",
      data: model.hero_image,
      attached?: true
    )

    render(partial: "fields/attached/one/show", locals: {field: field})

    expect(rendered).to have_element("img", src: rails_blob_url(model.hero_image))
      .and(have_no_text("No attachment"))
  end
end
