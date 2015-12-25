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

  scenario "admin searches using a model scope", :js do
    query = "scope:subscribed"
    subscribed_customer = create(
      :customer,
      name: "Dan Croak",
      email_subscriber: true)
    other_customer = create(
      :customer,
      name: "Foo Bar",
      email_subscriber: false)

    visit admin_customers_path
    fill_in :search, with: query
    page.execute_script("$('.search').submit()")

    expect(page).to have_content(subscribed_customer.name)
    expect(page).not_to have_content(other_customer.name)
  end

  scenario "ignores malicious scope searches", :js do
    query = "scope:destroy_all"
    customer = create(
      :customer,
      name: "FooBar destroy_all: user",
      email_subscriber: false)

    visit admin_customers_path
    fill_in :search, with: query
    page.execute_script("$('.search').submit()")
    expect(page).to have_content(customer.name)
  end

  scenario "admin searches into a model scope", :js do
    searching_for = "Lua"
    query = "scope:subscribed #{searching_for}"
    subscribed_unmathed = create(
      :customer,
      name: "Dan Croak",
      email_subscriber: true)
    subscribed_matched = create(
      :customer,
      name: "#{searching_for} Miaus",
      email_subscriber: true)
    unsubscribed_matched = create(
      :customer,
      name: "#{searching_for} Doe",
      email_subscriber: false)

    visit admin_customers_path
    fill_in :search, with: query
    page.execute_script("$('.search').submit()")

    page.within("tr.table__row", match: :first) do
      expect(page).to have_content(subscribed_matched.name)
    end
    expect(page).not_to have_content(subscribed_unmathed.name)
    expect(page).not_to have_content(unsubscribed_matched.name)
  end

  scenario "admin searches a word inside two model scopes", :js do
    searching_for = "Lua"
    query = "scope:subscribed scope:old #{searching_for}"
    subscribed_unmathed = create(
      :customer,
      name: "Dan Croak",
      email_subscriber: true)
    unsubscribed_matched = create(
      :customer,
      name: "#{searching_for} Doe",
      email_subscriber: false)
    subscribed_match_but_new = create(
      :customer,
      created_at: 1.day.ago,
      name: "#{searching_for} New",
      email_subscriber: true)
    subscribed_and_old_match = create(
      :customer,
      created_at: 5.years.ago,
      name: "#{searching_for} Miaus",
      email_subscriber: true)

    visit admin_customers_path
    fill_in :search, with: query
    page.execute_script("$('.search').submit()")

    page.within("tr.table__row", match: :first) do
      expect(page).to have_content(subscribed_and_old_match.name)
    end
    expect(page).not_to have_content(subscribed_unmathed.name)
    expect(page).not_to have_content(unsubscribed_matched.name)
    expect(page).not_to have_content(subscribed_match_but_new.name)
  end

  scenario "admin clicks a scope button", :js do
    subscribed = create(
      :customer,
      name: "Lua Miaus",
      email_subscriber: true)
    unsubscribed = create(
      :customer,
      name: "John Doe",
      email_subscriber: false)

    visit admin_customers_path
    click_on "subscribed"

    page.within("tr.table__row", match: :first) do
      expect(page).to have_content(subscribed.name)
    end
    expect(page).not_to have_content(unsubscribed.name)
  end
end
