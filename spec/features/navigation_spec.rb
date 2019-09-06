require "rails_helper"

describe "navigation" do
  let(:navigation) { find(".navigation") }

  it "highlights the link to the current page's resource type" do
    visit admin_customers_path

    active_link = find(".navigation__link--active")

    expect(active_link.text).to eq "Customers"
  end

  it "displays links to resources from admin namespace" do
    visit admin_root_path

    expect(navigation).to have_link("Customers")
    expect(navigation).to have_link("Line Items")
    expect(navigation).to have_link("Log Entries")
    expect(navigation).to have_link("Products")
    expect(navigation).to have_link("Product Meta Tags")
    expect(navigation).to have_link("Payments")
    expect(navigation).to have_link("Series")
    expect(navigation).to have_link("Blog/Posts")
  end

  it "does not display links to resources configured to not be rendered in navigation" do
    LineItemDashboard.configuration.navigation = false

    visit admin_root_path
    expect(navigation).not_to have_link("Line Items")

    LineItemDashboard.configuration.navigation = true # Reset to default
  end

  it "displays translated name of model" do
    translations = {
      activerecord: {
        models: {
          customer: {
            one: "User",
            other: "Users",
          },
        },
      },
    }

    with_translations(:en, translations) do
      visit admin_customers_path

      expect(navigation).to have_link("Users")
      expect(page).to have_header("Users")
    end
  end
end
