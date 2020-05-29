require "rails_helper"
require "administrate/field/rich_text"
require "support/field_matchers"

describe Administrate::Field::RichText do
  include FieldMatchers

  it do
    should_permit_param(
      "foo",
      on_model: Customer,
      for_attribute: :foo
    )
  end

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      action_text = ActionText::RichText.new(
        body: "<div class='trix'><p>Foo</p></div>"
      )
      field = Administrate::Field::RichText.new(:document, action_text, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/rich_text/#{page}")
    end
  end

  describe "#to_s" do
    it "displays plain body text" do
      action_text = ::ActionText::RichText.new(
        body: "<div class='trix'><p>Foo</p></div>"
      )
      rich_text = Administrate::Field::RichText.new(
        :document, action_text, :show
      )

      expect(rich_text.to_s).to eq("Foo")
    end

    context "when data is nil" do
      it "is nil" do
        rich_text = Administrate::Field::RichText.new(:document, nil, :page)

        expect(rich_text.to_s).to be_nil
      end
    end
  end
end
