require "rails_helper"
require "administrate/field/rich_text"

describe "fields/rich_text/_show", type: :view do
  context "when body" do
    it "renders the HTML" do
      action_text = ActionText::RichText.new(
        body: "<div class='trix-context'><p>Foo</p></div>"
      )
      field = Administrate::Field::RichText.new(:document, action_text, :show)

      render(
        partial: "fields/rich_text/show",
        locals: {field: field, namespace: :admin}
      )

      expect(rendered).to have_css(
        %(div[class='trix-context']),
        text: "Foo"
      )
    end
  end

  context "when no body" do
    it "renders nil" do
      action_text = ActionText::RichText.new(body: nil)
      field = Administrate::Field::RichText.new(:document, action_text, :show)

      render(
        partial: "fields/rich_text/show",
        locals: {field: field, namespace: :admin}
      )

      expect(rendered).to_not have_css(%(div[class='trix-context']))
    end
  end
end
