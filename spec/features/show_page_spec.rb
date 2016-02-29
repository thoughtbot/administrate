require "rails_helper"

RSpec.describe "customer show page" do
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
end
