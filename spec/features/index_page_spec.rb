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

    expect(page).to have_header(customer.to_s)
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
end
