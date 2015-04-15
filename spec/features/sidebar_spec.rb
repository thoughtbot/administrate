require "rails_helper"

RSpec.describe "sidebar" do
  it "highlights the link to the current page's resource type" do
    visit customers_path

    active_link = find(".sidebar .active")

    expect(active_link.text).to eq "Customers"
  end
end
