require "rails_helper"
require "administrate/field/has_many"

describe "fields/has_many/_form", type: :view do
  describe "the field label" do
    it "displays the association name" do
      has_many = Administrate::Field::HasMany.new(:associated_objects, [],
        :some_page)

      allow(has_many).to receive(:associated_resource_options).and_return([])

      render(
        partial: "fields/has_many/form.html.erb",
        locals: { f: fake_form_builder, field: has_many },
      )

      expect(rendered).to include("Associated objects")
    end
  end

  def fake_form_builder
    object_name = "some object"
    object = double("object", associated_object_ids: [])
    template = ActionController::Base.new.view_context
    options = {}
    ActionView::Helpers::FormBuilder.new(object_name, object, template, options)
  end
end
