require "rails_helper"

describe "order form" do
  it "displays a select box for the customer" do
    customer = create(:customer)

    visit new_order_path
    select(customer.name, from: "Customer")
    fill_in "Address line one", with: "Example"
    fill_in "Address line two", with: "Example"
    fill_in "Address city", with: "Example"
    fill_in "Address state", with: "Example"
    fill_in "Address zip", with: "Example"
    click_on "Create Order"

    expect(page).to have_link(customer.name)
  end
end
