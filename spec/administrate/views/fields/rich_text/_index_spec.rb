require "rails_helper"
require "administrate/field/rich_text"

describe "fields/rich_text/_index", type: :view do
  it "renders truncated plain text" do
    action_text = ActionText::RichText.new(body:
                                           "<div class='trix-context'>
                                            <p>AAAAAAAAAA</p>
                                            <p>BBBBBBBBBB</p>
                                            </div>")
    field = Administrate::Field::RichText.new(:document, action_text, :index)

    render(
      partial: "fields/rich_text/index",
      locals: {field: field, namespace: :admin}
    )

    expect(rendered).to_not have_css(%(div[class='trix-context']))
    expect(rendered).to have_text("AA")
    expect(rendered).to_not have_text("B")
  end
end
