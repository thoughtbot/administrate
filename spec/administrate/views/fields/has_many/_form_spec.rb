require "rails_helper"

describe "fields/has_many/_form", type: :view do
  describe "the field label" do
    it "displays the association name" do
      has_many = double(
        attribute_key: :associated_object_ids,
        attribute: :associated_objects,
      )

      render(
        partial: "fields/has_many/form.html.erb",
        locals: { f: fake_form_builder, field: has_many },
      )

      expect(rendered).to include("Associated objects")
    end
  end

  def fake_form_builder
    double("Form Builder").as_null_object.tap do |form_builder|
      allow(form_builder).to receive(:label) do |*args|
        args.first.to_s.humanize
      end
    end
  end
end
