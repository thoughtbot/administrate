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
    fields_builder = double("Fields Builder").as_null_object.tap do |fb|
      allow(fb).to receive(:label) do |*args|
        args.last
      end
    end

    double("Form Builder").as_null_object.tap do |form_builder|
      allow(form_builder).to receive(:fields_for) do |*_, &block|
        block.call(fields_builder)
      end
    end
  end
end
