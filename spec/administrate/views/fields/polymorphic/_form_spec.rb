require "rails_helper"

describe "fields/polymorphic/_form", type: :view do

  it "displays the association name" do
    polymorphic = double(name: "parent").as_null_object

    render(
      partial: "fields/polymorphic/form.html.erb",
      locals: { field: polymorphic, f: fake_form_builder },
    )

    expect(rendered).to include("Parent")
  end

  def fake_form_builder
    double("Form Builder").as_null_object.tap do |form_builder|
      allow(form_builder).to receive(:label) do |*args|
        args.first.to_s.titleize
      end
    end
  end
end
