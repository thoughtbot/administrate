require "rails_helper"
require "administrate/field/has_one"

describe "fields/has_one/_form", type: :view do
  let!(:has_one) {
    instance_double(
      "Administrate::Field::HasOne",
      attribute: "Meta",
      data: nil,
      nested_form: nested_form,
      name: "product_tag"
    )
  }

  it "displays the resource name" do
    allow(view).to receive(:render_field).and_return(<<~HTML.html_safe)
      <div class="field-unit__field">
        <input type="text" value="" name="product[product_meta_tag_attributes][meta_title]">
      </div>
    HTML

    render(
      partial: "fields/has_one/form",
      locals: {field: has_one, f: form_builder}
    )

    expect(rendered.strip)
      .to include("Product Tag")
      .and include('<input type="text" value="" name="product[product_meta_tag_attributes][meta_title]">')
  end

  it "displays the nested field hint" do
    allow(view).to receive(:render_field).and_return(<<~HTML.html_safe)
      <div class="field-unit__field">
        <input type="text" value="" name="product[product_meta_tag_attributes][meta_title]">
      </div>
    HTML

    translations = {
      administrate: {
        field_hints: {
          product_meta_tag: {
            simple_string_field: "Field hint",
          },
        },
      },
    }

    with_translations(:en, translations) do
      render(
        partial: "fields/has_one/form",
        locals: {field: has_one, f: form_builder}
      )
    end

    expect(rendered.strip)
      .to include('<input type="text" value="" name="product[product_meta_tag_attributes][meta_title]">')
      .and include(%r[<div class="field-unit__hint">\s+Field hint\s+</div>])
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
      "Administrate::Page::Form",
      resource: double(
        class: ProductMetaTag
      ),
      attributes: {"simple_string_field" => [
        instance_double(
          "Administrate::Field::String",
          name: "simple_string_field",
          truncate: "string value",
          html_class: "string",
          to_partial_path: "fields/string/index"
        )
      ]},
      resource_name: "product_meta_tag",
    )
  end
end
