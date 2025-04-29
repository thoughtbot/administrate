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

    find(:xpath, "//div[contains(@class, 'selectize-input') and .//input[@id='customer_kind-selectized']]").click
    find(:xpath, "//div[@data-selectable and contains(., 'vip')]").click

    click_on "Update Customer"

    expect(page).to have_text("KIND")
    expect(page).to have_text("vip")

    visit edit_admin_customer_path(customer)
    expect(page).to have_css(
      ".selectize-input.items > [data-value]",
      text: "vip"
    )
  end

  it "displays an error when the submitted form is invalid" do
    customer = create(:customer)

    visit edit_admin_customer_path(customer)
    fill_in "Name", with: ""
    click_on "Update Customer"

    expect(page).to have_css(
      "#error_explanation ul li.flash-error",
      text: "Name can't be blank"
    )
  end

  it "displays a success message for successful updates" do
    new_name = "Hyper"
    new_email = "example@example.com"
    customer = create(:customer)

    translations = {
      activerecord: {
        models: {
          customer: "Custom name"
        }
      }
    }

    with_translations(:en, translations) do
      visit edit_admin_customer_path(customer)
      fill_in "Name", with: new_name
      fill_in "Email", with: new_email
      click_on "Update Custom name"
    end

    expect(page).to have_text(new_name)
    expect(page).to have_text(new_email)
    expect(page).to have_flash("Custom name was successfully updated.")
  end

  it "handles complex associations" do
    country = create(:country, code: "CO")
    customer = create(:customer, territory: country)

    visit edit_admin_customer_path(customer)
    click_on "Update Customer"

    customer.reload
    expect(customer.territory).to eq(country)
  end

  it "allows selecting a resource and submitting the form", :js do
    _blog_post = create(:blog_post, title: "How to Bake Bread")
    _blog_post2 = create(:blog_post, title: "How to Play Guitar")
    tag = create(:blog_tag)

    visit edit_admin_blog_tag_path(tag)
    find(".selectize-input").click
    find(".selectize-input").fill_in(with: "Bake Bread")
    find(".option", text: "How to Bake Bread").click
    click_button "Update Tag"

    expect(page).to have_content("How to Bake Bread")
  end
end
