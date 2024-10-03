require "rails_helper"
require "administrate/field/text"

RSpec.describe "fields/text/_form", type: :view do
  it "allows configuring input options" do
    textarea = instance_double(
      "Administrate::Field::Text",
      attribute: :name,
      data: nil,
      options: {input_options: {rows: 50}}
    )

    render_partial(textarea)

    expect(rendered).to have_css(%(textarea[rows=50]))
  end

  it "doesn't require input options" do
    textarea = instance_double(
      "Administrate::Field::Text",
      attribute: :name,
      data: nil,
      options: {}
    )

    render_partial(textarea)

    expect(rendered).to have_css(%(textarea))
  end

  def render_partial(field)
    product = build(:product)

    render(
      partial: "fields/text/form",
      locals: {field: field, f: form_builder(product)}
    )
  end

  def form_builder(object)
    ActionView::Helpers::FormBuilder.new(
      object.model_name.singular,
      object,
      build_template,
      {}
    )
  end

  def build_template
    Object.new.tap do |template|
      template.extend ActionView::Helpers::FormHelper
      template.extend ActionView::Helpers::FormOptionsHelper
      template.extend ActionView::Helpers::FormTagHelper
    end
  end
end
