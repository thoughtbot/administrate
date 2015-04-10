require "spec_helper"
require "adapters/string_adapter"

RSpec.describe StringAdapter do
  it "renders the string for the show page" do
    string = "hello"

    adapter = StringAdapter.new(string)
    rendered = adapter.render_show

    expect(rendered).to eq string
  end

  it "renders the string for the index page" do
    string = "hello"

    adapter = StringAdapter.new(string)
    rendered = adapter.render_index

    expect(rendered).to eq string
  end

  it "renders an input form for the edit page" do
    string = "hello"
    form_object_double = double(text_field: string)

    adapter = StringAdapter.new(string)
    rendered = adapter.render_edit(form_object_double, :attribute)

    expect(rendered).to eq string
    expect(form_object_double).to have_received(:text_field).with(:attribute)
  end
end
