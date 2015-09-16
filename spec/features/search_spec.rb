require "rails_helper"

feature "Search" do
  scenario "admin searches for customer by email", :js do
    query = "bar@baz.com"
    perfect_match = create(:customer, email: "bar@baz.com")
    partial_match = create(:customer, email: "foobar@baz.com")
    mismatch = create(:customer, email: "other@baz.com")

    visit admin_customers_path
    fill_in :search, with: query
    page.execute_script("$('.search').submit()")

    expect(page).to have_content(perfect_match.email)
    expect(page).to have_content(partial_match.email)
    expect(page).not_to have_content(mismatch.email)
  end

  scenario "admin searches across different fields", :js do
    query = "dan"
    name_match = create(:customer, name: "Dan Croak", email: "foo@bar.com")
    email_match = create(:customer, name: "foo", email: "dan@thoughtbot.com")
    mismatch = create(:customer)

    visit admin_customers_path
    fill_in :search, with: query
    page.execute_script("$('.search').submit()")

    expect(page).to have_content(name_match.email)
    expect(page).to have_content(email_match.email)
    expect(page).not_to have_content(mismatch.email)
  end
end
