require "rails_helper"
require "adapters/email_adapter"

RSpec.describe EmailAdapter, type: :controller do
  it "renders the email with a link for the show page" do
    email = "hello@example.com"

    adapter = EmailAdapter.new(email, request)
    rendered = adapter.render_show

    expect(rendered).to eq "<a href=\"mailto:#{email}\">#{email}</a>"
  end

  it "renders the email for the index page" do
    email = "hello@example.com"

    adapter = EmailAdapter.new(email, request)
    rendered = adapter.render_index

    expect(rendered).to eq email
  end

  it "renders an input form for the edit page" do
    email = "hello@example.com"
    form_object_double = double(text_field: email)

    adapter = EmailAdapter.new(email, request)
    rendered = adapter.render_form_field(form_object_double, :attribute)

    expect(rendered).to eq email
    expect(form_object_double).to have_received(:text_field).with(:attribute)
  end
end
