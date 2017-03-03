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

    expect(page).to have_text("Name")
    expect(page).to have_text("Email")
  end

  it "displays boolean values as check boxes" do
    customer = create(:customer, email_subscriber: false)

    visit edit_admin_customer_path(customer)
    check "Email subscriber"
    click_on "Update Customer"

    expect(page).to have_text("true")
  end

  it "displays selectable strings as dropdowns", :js do
    customer = create(:customer, kind: :standard)

    visit edit_admin_customer_path(customer)
    select "vip", from: "Kind"
    click_on "Update Customer"

    expect(page).to have_text("KIND")
    expect(page).to have_text("vip")
  end

  it "displays an error when the submitted form is invalid" do
    customer = create(:customer)

    visit edit_admin_customer_path(customer)
    fill_in "Name", with: ""
    click_on "Update Customer"

    expect(page).to have_css(
      "#error_explanation ul li.flash-error",
      text: "Name can't be blank",
    )
  end

  it "displays a success message for successful updates" do
    new_name = "Hyper"
    new_email = "example@example.com"
    customer = create(:customer)

    visit edit_admin_customer_path(customer)
    fill_in "Name", with: new_name
    fill_in "Email", with: new_email
    click_on "Update Customer"

    expect(page).to have_text(new_name)
    expect(page).to have_text(new_email)
    expect(page).to have_flash("Customer was successfully updated.")
  end
end
