require "rails_helper"

describe "customer edit page" do
  it "displays the customer's title attribute as the header" do
    customer = create(:customer)

    visit edit_admin_customer_path(customer)

    expect(page).to have_header("Edit #{customer.name}")
  end

  it "has button to view customer details" do
    customer = create(:customer)

    visit edit_admin_customer_path(customer)

    expect(page).to have_link("Show #{displayed(customer)}")
  end

  it "has forms for the customer's attributes" do
    customer = create(:customer)

    visit edit_admin_customer_path(customer)

    expect(page).to have_content("Name")
    expect(page).to have_content("Email")
  end

  it "displays boolean values as check boxes" do
    customer = create(:customer, email_subscriber: false)

    visit edit_admin_customer_path(customer)
    check "Email subscriber"
    click_on "Update Customer"

    expect(page).to have_content("true")
  end
end
