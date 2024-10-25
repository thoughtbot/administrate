require "rails_helper"
require "administrate/field/attached/one"

describe "field/attached/one/_form", type: :view do
  it "renders a singular file field" do
    model = build(:product, hero_image: nil)
    field = instance_double(
      "Administrate::Field::Attached::One",
      attribute: :hero_image,
      data: nil
    )

    fields model: model do |f|
      concat render(
        partial: "fields/attached/one/form",
        locals: {field: field, f: f}
      )
    end

    expect(rendered).to have_field(
      "product[hero_image]", type: "file"
    )
  end
end
