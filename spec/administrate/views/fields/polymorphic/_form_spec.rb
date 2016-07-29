require "rails_helper"

describe "fields/polymorphic/_form", type: :view do
  include_context "fake_field_label"

  it "displays the field name" do
    polymorphic = double(name: "Commentable")
    allow(polymorphic).to receive(:attribute).and_return("commentable")
    allow(polymorphic).to receive(:attribute_key).and_return("commentable_id")

    render(
      partial: "fields/polymorphic/form.html.erb",
      locals: { field: polymorphic, f: form_builder }
    )

    expect(rendered.strip).to include("Commentable")
  end

  it "does not display a form" do
    polymorphic = double(name: "Commentable")
    allow(polymorphic).to receive(:attribute).and_return("commentable")

    render(
      partial: "fields/polymorphic/form.html.erb",
      locals: { field: polymorphic, f: form_builder }
    )

    expect(rendered).
      to include(t("administrate.fields.polymorphic.not_supported"))
  end

  def form_builder
    double("Form Builder", label: "Commentable")
  end
end
