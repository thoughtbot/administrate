require "rails_helper"

RSpec.describe "customer index page" do
  it "displays customers' name and email" do
    customer = create(:customer)

    visit customers_path

    expect(page).to have_header("Customers")
    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end

  it "links to the customer show page" do
    customer = create(:customer)

    visit customers_path
    click_on customer.name

    expect(current_path).to eq(customer_path(customer))
    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end

  it "links to the edit page" do
    customer = create(:customer)

    visit customers_path
    click_on "Edit"

    expect(current_path).to eq(edit_customer_path(customer))
  end

  it "links to the new page" do
    visit customers_path
    click_on("New customer")

    expect(current_path).to eq(new_customer_path)
  end
end
