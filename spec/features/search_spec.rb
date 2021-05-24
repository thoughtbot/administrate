require "rails_helper"
require "administrate/field/email"
require "administrate/field/string"

feature "Search" do
  describe "search bar" do
    def have_a_search_bar
      have_css("form[role=search]")
    end

    it "is visible when the current dashboard has searchable attributes" do
      visit admin_customers_path
      expect(page).to have_a_search_bar
    end

    it "is hidden when nothing is searchable in the current dashboard" do
      CustomerDashboard::ATTRIBUTE_TYPES.each do |_name, field_class|
        allow(field_class).to(
          receive(:searchable?).and_return(false),
        )
      end

      visit admin_customers_path
      expect(page).not_to have_a_search_bar
    end
  end

  scenario "admin searches for customer by email", :js do
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

  scenario "admin searches for order by id", :js do
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

  scenario "admin searches across different fields", :js do
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

  scenario "admin searches with a filter", :js do
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

  scenario "admin searches with a filter with arguments", :js do
    kind_match = create(:customer, kind: "vip", email: "vip@kind.com")
    standard_match = create(:customer, kind: "standard", email: "me@kind.com")
    no_match = create(:customer, kind: "vip", email: "standard@kind.com")

    visit admin_customers_path
    fill_in :search, with: "kind:standard"
    submit_search

    expect(page).to have_content(standard_match.email)
    expect(page).not_to have_content(kind_match.email)
    expect(page).not_to have_content(no_match.email)

    clear_search
    fill_in :search, with: "kind:vip"
    submit_search

    expect(page).not_to have_content(standard_match.email)
    expect(page).to have_content(kind_match.email)
  end

  scenario "admin searches with an a term similiar to a filter", :js do
    query = "whatevs:"
    some_customer = create(:customer, name: "whatevs:")
    another_customer = create(:customer)

    visit admin_customers_path
    fill_in :search, with: query
    submit_search

    expect(page).to have_content(some_customer.email)
    expect(page).not_to have_content(another_customer.email)
  end

  scenario "admin clears search" do
    query = "foo"
    mismatch = create(:customer, name: "someone")
    visit admin_customers_path(search: query, customer: { order: :name })

    expect(page).not_to have_content(mismatch.email)
    clear_search
    expect(page_params).to eq("customer[order]=name")
    expect(page).to have_content(mismatch.email)
  end

  scenario "admin searches across associations fields", :js do
    country = create(:country, name: "Brazil", code: "BR")
    country_match = create(:customer, territory: country)
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
