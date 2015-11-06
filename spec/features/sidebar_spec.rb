require "rails_helper"

describe "sidebar" do
  it "highlights the link to the current page's resource type" do
    visit admin_customers_path

    active_link = find(".sidebar__link--active")

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

      sidebar = find(".sidebar__list")
      expect(sidebar).to have_link("Users")
      expect(page).to have_header("Users")
    end
  end
end
