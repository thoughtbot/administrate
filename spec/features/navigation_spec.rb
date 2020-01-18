require "rails_helper"

describe "navigation" do
  it "has the link of back to application" do
    visit admin_customers_path

    navigation = find(".navigation")
    expect(navigation).to have_link("Back to app")
  end

  it "highlights the link to the current page's resource type" do
    visit admin_customers_path

    active_link = find(".navigation__link--active")

    expect(active_link.text).to eq "Customers"
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

      navigation = find(".navigation")
      expect(navigation).to have_link("Users")
      expect(page).to have_header("Users")
    end
  end

  it "hides link to resources without index page" do
    visit admin_customers_path
    navigation = find(".navigation")
    expect(navigation).not_to have_link("Product Meta Tags")
  end
end
