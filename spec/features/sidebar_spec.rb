require "rails_helper"

describe "sidebar" do
  it "highlights the link to the current page's resource type" do
    visit admin_customers_path

    active_link = find(".sidebar__link--active")

    expect(active_link.text).to eq "Customers"
  end
end
