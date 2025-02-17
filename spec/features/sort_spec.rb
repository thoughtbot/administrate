require "rails_helper"

feature "Sort" do
  describe "sortable" do
    context "when the field is sortable" do
      it "is a link to sort by that field" do
        visit admin_customers_path
        expect(page).to have_link("Name")
      end
    end

    context "when the field is NOT sortable" do
      it "is not a link" do
        visit admin_customers_path
        expect(page).not_to have_link("Password")
      end
    end
  end

  scenario "admin sorts customers by name" do
    dan = create(:customer, name: "Dan Croak")
    bob = create(:customer, name: "Bob")
    alice = create(:customer, name: "Alice")

    visit admin_customers_path
    click_on "Name"

    expect(page).to have_css("table tr:nth-child(1)", text: alice.name)
    expect(page).to have_css("table tr:nth-child(2)", text: bob.name)
    expect(page).to have_css("table tr:nth-child(3)", text: dan.name)
  end

  scenario "admin sorts orders by full_address (virtual field)" do
    create(:order, address_zip: "651", address_state: "UT")
    create(:order, address_zip: "7", address_state: "WV")
    create(:order, address_zip: "59543-0366", address_state: "NJ")

    visit admin_orders_path
    click_on "Full Address"

    expect(page).to have_css("table tr:nth-child(1)", text: "NJ 59543-0366")
    expect(page).to have_css("table tr:nth-child(2)", text: "UT 651")
    expect(page).to have_css("table tr:nth-child(3)", text: "WV 7")
  end

  scenario "admin sorts customer's orders by full_address (virtual field)" do
    customer = create(:customer, name: "Alice")
    customer.orders << create(:order, address_zip: "651", address_state: "UT")
    customer.orders << create(:order, address_zip: "7", address_state: "WV")
    customer.orders << create(:order, address_zip: "59543-0366", address_state: "NJ")

    visit admin_customer_path(customer)
    click_on "Full Address"

    within(table_for_attribute(:orders)) do
      expect(page).to have_css("tr:nth-child(1)", text: "NJ 59543-0366")
    end
  end

  scenario "admin sorts order's list_items by product name" do
    product_1 = create(:product, name: "Monopoly 2")
    product_2 = create(:product, name: "Monopoly 3")
    product_3 = create(:product, name: "Monopoly 1")
    customer = create(:customer)
    order = create(:order, customer: customer)
    order.line_items << create(:line_item, product: product_1)
    order.line_items << create(:line_item, product: product_2)
    order.line_items << create(:line_item, product: product_3)

    visit admin_order_path(order)
    click_on "Product"

    within(table_for_attribute(:line_items)) do
      expect(page).to have_css("tr:nth-child(1)", text: "Monopoly 1")
      expect(page).to have_css("tr:nth-child(2)", text: "Monopoly 2")
      expect(page).to have_css("tr:nth-child(3)", text: "Monopoly 3")
    end
  end

  def table_for_attribute(attr_name)
    find("table[aria-labelledby=#{attr_name}]")
  end
end
