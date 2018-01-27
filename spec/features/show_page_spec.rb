require "rails_helper"

RSpec.describe "customer show page" do
  describe "displays the customers orders paginated" do
    it "displays the first page by default, other pages when specified" do
      customer = create(:customer)
      orders = create_list(:order, 4, customer: customer)
      order_ids = orders.map(&:id)
      ids_in_page1 = ids_in_page2 = nil

      visit admin_customer_path(customer)

      within(".attribute-data--has-many") do
        ids_in_page1 = ids_in_table
        expect(ids_in_page1.count).to eq 2
        expect(order_ids).to include(*ids_in_page1)
      end

      click_on("Next ›")

      within(".attribute-data--has-many") do
        ids_in_page2 = ids_in_table
        expect(ids_in_page2.count).to eq 2
        expect(order_ids).to include(*ids_in_page2)
      end

      ids_in_table = (ids_in_page1 + ids_in_page2).uniq
      expect(ids_in_table).to match_array(order_ids)
    end
  end

  it "displays the customer's title attribute as the header" do
    customer = create(:customer)

    visit admin_customer_path(customer)

    expect(page).to have_header(customer.name)
  end

  it "displays the customer's other attributes" do
    customer = create(:customer)

    visit admin_customer_path(customer)

    expect(page).to have_content(customer.email)
  end

  it "displays each of the customer's orders" do
    customer = create(:customer)
    orders = create_pair(:order, customer: customer)
    orders.map.with_index(1) do |order, index|
      create(:line_item, order: order, unit_price: 10, quantity: index)
    end

    visit admin_customer_path(customer)

    orders.each do |order|
      expect(page).to have_content(order.total_price)
    end
  end

  it "links to the customer's orders", :js do
    customer = create(:customer)
    order = create(:order, customer: customer)

    visit admin_customer_path(customer)

    click_row_for(order)

    expect(page).to have_header(displayed(order))
  end

  it "link-ifies the email" do
    customer = create(:customer)

    visit admin_customer_path(customer)

    expect(page).to have_link(customer.email)
  end

  it "links to the edit page" do
    customer = create(:customer)

    visit admin_customer_path(customer)
    click_on "Edit"

    expect(page).to have_header("Edit #{displayed(customer)}")
  end

  it "displays translated labels" do
    custom_label = "Newsletter Subscriber"
    customer = create(:customer)

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
      visit admin_customer_path(customer)

      expect(page).to have_css(".attribute-label", text: custom_label)
    end
  end

  it "displays translated labels in has_many collection partials" do
    custom_label = "Time Shipped"
    customer = create(:customer)
    create(:order, customer: customer)

    translations = {
      administrate: {
        actions: {
          edit: "Edit",
          destroy: "Destroy",
          confirm: "Are you sure?",
        },
      },
      helpers: {
        label: {
          order: {
            shipped_at: custom_label,
          },
        },
      },
    }

    with_translations(:en, translations) do
      visit admin_customer_path(customer)

      expect(page).to have_css(".cell-label", text: custom_label)
    end
  end

  def ids_in_table
    all("tr td:first-child").map(&:text).map(&:to_i)
  end
end
