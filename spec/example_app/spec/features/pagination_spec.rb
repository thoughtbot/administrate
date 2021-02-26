require "rails_helper"

search_input_selector = ".search__input"

RSpec.feature "Pagination", type: :feature do
  def expect_to_appear_in_order(*elements)
    positions = elements.map { |e| page.body.index(e) }
    expect(positions).to eq(positions.sort)
  end

  it "paginates records based on a query param" do
    customers = create_list(:customer, 2)

    visit admin_customers_path(per_page: 1)

    expect(page).not_to have_content(customers.last.name)
    click_on "Next"
    expect(page).to have_content(customers.last.name)
  end

  describe "sorting" do
    it "allows sorting by columns" do
      create(:customer, name: "unique name two")
      create(:customer, name: "unique name one")

      visit admin_customers_path
      click_on "Name"

      expect_to_appear_in_order("unique name one", "unique name two")
    end

    it "allows clicking through after sorting", :js do
      customer = create(:customer)
      create(:order, customer: customer)

      visit admin_customers_path
      click_on "Name"
      find("[data-url]").click
      expect(page).to have_header("Show #{customer.name}")
    end

    it "allows reverse sorting" do
      create(:customer, name: "unique name one")
      create(:customer, name: "unique name two")

      visit admin_customers_path
      2.times { click_on "Name" }

      expect_to_appear_in_order("unique name two", "unique name one")
    end

    it "toggles the order" do
      create(:customer, name: "unique name one")
      create(:customer, name: "unique name two")

      visit admin_customers_path
      3.times { click_on "Name" }

      expect_to_appear_in_order("unique name one", "unique name two")
    end

    it "preserves search" do
      query = "bar@baz.com"

      visit admin_customers_path(search: query)
      click_on "Name"

      expect(find(search_input_selector).value).to eq(query)
    end
  end

  context "with resources of type Page" do
    it "can paginate and sort" do
      FactoryBot.create(:page, title: "Page 2")
      FactoryBot.create(:page, title: "Page 4")
      FactoryBot.create(:page, title: "Page 1")
      FactoryBot.create(:page, title: "Page 5")
      FactoryBot.create(:page, title: "Page 3")

      visit admin_pages_path(per_page: 3)
      click_on "Title"
      expect_to_appear_in_order("Page 1", "Page 2", "Page 3")

      click_on "Next"
      expect_to_appear_in_order("Page 4", "Page 5")
    end
  end
end
