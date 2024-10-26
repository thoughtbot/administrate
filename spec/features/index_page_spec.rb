require "rails_helper"

describe "customer index page" do
  it "displays customers' name and email" do
    customer = create(:customer)

    visit admin_customers_path

    expect(page).to have_header("Customers")
    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end

  it "adds resource/attribute name to table headers" do
    visit admin_customers_path

    expect(page).to have_css("th.cell-label--customer_email")
  end

  it "links to the customer show page", :js do
    customer = create(:customer)

    visit admin_customers_path
    click_row_for(customer)

    expect(page).to have_header(displayed(customer))
    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end

  it "links to the customer show page without javascript", js: false do
    customer = create(:customer)

    visit admin_customers_path
    click_show_link_for(customer)

    expect(page).to have_header(displayed(customer))
  end

  it "links to the edit page" do
    customer = create(:customer)

    visit admin_customers_path
    click_on "Edit"

    expect(page).to have_current_path(edit_admin_customer_path(customer))
  end

  it "links to the new page" do
    visit admin_customers_path
    click_on("New customer")

    expect(page).to have_current_path(new_admin_customer_path)
  end

  it "displays translated labels" do
    custom_label = "Newsletter Subscriber"

    translations = {
      helpers: {
        label: {
          customer: {
            email_subscriber: custom_label
          }
        }
      }
    }

    with_translations(:en, translations) do
      visit admin_customers_path

      expect(page).to have_table_header(custom_label)
    end
  end

  it "sorts by count on a has_many association" do
    create_list(:order, 2, customer: create(:customer, name: "Ade"))
    create_list(:order, 3, customer: create(:customer, name: "Ben"))
    create_list(:order, 1, customer: create(:customer, name: "Cam"))

    visit admin_customers_path

    within(".main-content") { click_on "Orders" }
    within :table do
      expect(page).to have_css("tbody tr:nth-child(1)", text: "Cam").and(have_text("1 order"))
      expect(page).to have_css("tbody tr:nth-child(2)", text: "Ade").and(have_text("2 orders"))
      expect(page).to have_css("tbody tr:nth-child(3)", text: "Ben").and(have_text("3 orders"))
    end

    within(".main-content") { click_on "Orders" }
    within :table do
      expect(page).to have_css("tbody tr:nth-child(1)", text: "Ben").and(have_text("3 orders"))
      expect(page).to have_css("tbody tr:nth-child(2)", text: "Ade").and(have_text("2 orders"))
      expect(page).to have_css("tbody tr:nth-child(3)", text: "Cam").and(have_text("1 order"))
    end
  end
end
