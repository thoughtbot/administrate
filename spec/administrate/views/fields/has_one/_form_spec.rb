require "rails_helper"
require "administrate/field/has_one"

describe "fields/has_one/_form", type: :view do
  it "displays the resource name" do
    has_one = instance_double(
      "Administrate::Field::HasOne",
      attribute: "Meta",
      data: nil,
      nested_form: nested_form,
    )

    render(
      partial: "fields/has_one/form.html.erb",
      locals: { field: has_one, f: form_builder },
    )

    expect(rendered.strip).to include("Product Tag")
  end

  def form_builder
    builder = double("Form Builder")
    allow(builder).to receive(:fields_for) do |&block|
      block.call(double("Fields For Form Builder"))
    end
    allow(builder).to receive(:object_name).and_return(:product)
    builder
  end

  def nested_form
    instance_double(
      "Administrate::Page::Show",
      resource: double(
        class: ProductMetaTag,
      ),
      attributes: [],
      resource_name: "Product Tag",
    )
  end
end
