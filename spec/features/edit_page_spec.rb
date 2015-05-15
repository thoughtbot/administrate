require "rails_helper"

RSpec.describe "customer edit page" do
  it "displays the customer's title attribute as the header" do
    customer = create(:customer)

    visit edit_customer_path(customer)

    expect(page).to have_header("Edit #{customer.name}")
  end

  it "has forms for the customer's attributes" do
    customer = create(:customer)

    visit edit_customer_path(customer)

    expect(page).to have_content("Name")
    expect(page).to have_content("Email")
  end
end
