require "rails_helper"

RSpec.describe "Search", type: SYSTEM_TEST do
  it "admin searches for customer by email", :js do
    query = "bar@baz.com"
    perfect_match = create(:customer, email: "bar@baz.com")
    partial_match = create(:customer, email: "foobar@baz.com")
    mismatch = create(:customer, email: "other@baz.com")

    visit admin_customers_path
    fill_in :search, with: query
    submit_search

    expect(page).to have_content(perfect_match.email)
    expect(page).to have_content(partial_match.email)
    expect(page).not_to have_content(mismatch.email)
  end

  it "admin searches for order by id", :js do
    # Long, predictable ids to avoid simple numbers matching more than one thing
    orders = Array.new(4) { |i| create(:order, id: (i + 1).to_s * 7) }
    target, *rest = orders.shuffle

    visit admin_orders_path
    fill_in :search, with: target.id
    submit_search

    expect(page).to have_css("table tr", text: order_row_match(target))
    rest.each do |order|
      expect(page).not_to have_css("table tr", text: order_row_match(order))
    end
  end

  it "admin searches across different fields", :js do
    query = "dan"
    name_match = create(:customer, name: "Dan Croak", email: "foo@bar.com")
    email_match = create(:customer, name: "foo", email: "dan@thoughtbot.com")
    mismatch = create(:customer)

    visit admin_customers_path
    fill_in :search, with: query
    submit_search

    expect(page).to have_content(name_match.email)
    expect(page).to have_content(email_match.email)
    expect(page).not_to have_content(mismatch.email)
  end

  it "admin searches with a filter", :js do
    query = "vip:"
    kind_match = create(:customer, kind: "vip", email: "vip@kind.com")
    mismatch = create(:customer, kind: "standard", email: "standard@kind.com")
    name_match_only = create(:customer, name: "VIP", email: "vip@name.com")

    visit admin_customers_path
    fill_in :search, with: query
    submit_search

    expect(page).to have_content(kind_match.email)
    expect(page).not_to have_content(mismatch.email)
    expect(page).not_to have_content(name_match_only.email)
  end

  it "admin searches with an unknown filter", :js do
    query = "whatevs:"
    some_customer = create(:customer)
    another_customer = create(:customer)

    visit admin_customers_path
    fill_in :search, with: query
    submit_search

    expect(page).to have_content(some_customer.email)
    expect(page).to have_content(another_customer.email)
  end

  it "admin clears search" do
    query = "foo"
    mismatch = create(:customer, name: "someone")
    visit admin_customers_path(search: query, customer: { order: :name })

    expect(page).not_to have_content(mismatch.email)
    clear_search
    expect(page_params).to eq("customer[order]=name")
    expect(page).to have_content(mismatch.email)
  end

  it "admin searches across associations fields", :js do
    country = create(:country, name: "Brazil", code: "BR")
    country_match = create(:customer, country: country)
    mismatch = create(:customer)

    visit admin_customers_path

    fill_in :search, with: "Brazil"
    submit_search

    expect(page).to have_content(country_match.email)
    expect(page).to have_content(country.name)
    expect(page).not_to have_content(mismatch.email)
  end

  def clear_search
    find(".search__clear-link").click
  end

  def page_params
    CGI.unescape(URI.parse(page.current_url).query)
  end

  def submit_search
    page.execute_script("$('.search').submit()")
  end

  def order_row_match(order)
    /#{order.id}\s+#{order.customer.name}\s+/
  end
end
