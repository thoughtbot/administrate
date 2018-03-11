require "rails_helper"
require "administrate/field/has_many"

describe "fields/has_many/_form", type: :view do
  
  describe "the field label" do

    let(:has_many) { 
      Administrate::Field::HasMany.new(:associated_objects, [], :some_page)
    }

    before do
      allow(has_many).to receive(:associated_resource_options).and_return([])
      allow(view).to receive(:resource_name).and_return(:customer)
    end
  
    it "displays the association name" do
      render(
        partial: "fields/has_many/form.html.erb",
        locals: { f: fake_form_builder, field: has_many },
      )
      expect(rendered).to include("Associated objects")
    end
  
    it "displays the translation" do
      translations = {
        helpers: {
          label: {
            customer: {
              associated_object_ids: "Custom Associated Objects"
            },
          },
        },
      }

      with_translations(:en, translations) do
        render(
          partial: "fields/has_many/form.html.erb",
          locals: { f: fake_form_builder, field: has_many },
        )
        expect(rendered).to include("Custom Associated Objects")
      end
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
