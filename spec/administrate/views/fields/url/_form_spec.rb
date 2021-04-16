require "rails_helper"
require "administrate/field/url"

describe "fields/url/_form", type: :view do
  it "displays the resource name" do
    product = build(:product, image_url: nil)
    url = instance_double(
      "Administrate::Field::Url",
      attribute: :image_url,
      data: nil,
    )

    render(
      partial: "fields/url/form",
      locals: { field: url, f: form_builder(product) },
    )

    expect(rendered).to have_css(%{input[type="url"][name="product[image_url]"]})
  end

  def form_builder(object)
    ActionView::Helpers::FormBuilder.new(
      object.model_name.singular,
      object,
      build_template,
      {},
    )
  end

  def build_template
    Object.new.tap do |template|
      template.extend ActionView::Helpers::FormHelper
      template.extend ActionView::Helpers::FormOptionsHelper
    end
  end
end
