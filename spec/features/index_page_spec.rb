require "rails_helper"

describe "customer index page" do
  it "displays customers' name and email" do
    customer = create(:customer)

    visit admin_customers_path

    expect(page).to have_header("Customers")
    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end

  it "links to the customer show page", :js do
    customer = create(:customer)

    visit admin_customers_path
    click_row_for(customer)

    expect(page).to have_header(displayed(customer))
    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end

  it "links to the edit page" do
    customer = create(:customer)

    visit admin_customers_path
    click_on "Edit"

    expect(current_path).to eq(edit_admin_customer_path(customer))
  end

  it "links to the new page" do
    visit admin_customers_path
    click_on("New customer")

    expect(current_path).to eq(new_admin_customer_path)
  end

  it "displays translated labels" do
    custom_label = "Newsletter Subscriber"

    translations = {
      helpers: {
        label: {
          customer: {
            email_subscriber: custom_label,
          },
        },
      },
    }

    with_translations(:en, translations) do
      visit admin_customers_path

      expect(page).to have_table_header(custom_label)
    end
  end

  it "paginates records based on a constant" do
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

      expect(find(".search__input").value).to eq(query)
    end
  end

  def expect_to_appear_in_order(*elements)
    positions = elements.map { |e| page.body.index(e) }
    expect(positions).to eq(positions.sort)
  end
end
