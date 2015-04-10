require "rails_helper"

RSpec.describe "customer show page" do
  it "displays the customer's title attribute as the header" do
    customer = create(:customer)

    visit customer_path(customer)

    expect(page).to have_header(customer.name)
  end

  it "displays the customer's other attributes" do
    customer = create(:customer)

    visit customer_path(customer)

    expect(page).to have_content(customer.email)
  end

  it "link-ifies the email" do
    customer = create(:customer)

    visit customer_path(customer)

    expect(page).to have_link(customer.email)
  end

  it "links to the edit page" do
    customer = create(:customer)
    edit_path = edit_customer_path(customer)

    visit customer_path(customer)
    click_on "Edit"

    expect(current_path).to eq(edit_path)
  end
end
