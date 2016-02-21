require "rails_helper"
require "administrate/field/has_one"

describe "fields/has_one/_form", type: :view do
  it "displays the field name" do
    has_one = instance_double(
      "Administrate::Field::HasOne",
      attribute: "Commentable",
    )

    render(
      partial: "fields/has_one/form.html.erb",
      locals: { field: has_one, f: form_builder },
    )

    expect(rendered.strip).to include("Commentable")
  end

  it "does not display a form" do
    has_one = instance_double(
      "Administrate::Field::HasOne",
      attribute: "Commentable",
    )

    render(
      partial: "fields/has_one/form.html.erb",
      locals: { field: has_one, f: form_builder },
    )

    expect(rendered).
      to include(t("administrate.fields.has_one.not_supported"))
  end

  def form_builder
    double("Form Builder", label: "Commentable")
  end
end
