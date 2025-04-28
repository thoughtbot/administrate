require "rails_helper"

describe "log entry form" do
  it "displays a select box for the logeable" do
    customer = create(:customer)

    visit new_admin_log_entry_path
    fill_in "Action", with: "create"
    select(displayed(customer), from: "Logeable")
    click_on "Create Log entry"

    expect(page).to have_link(customer.name)
    expect(page).to have_flash(
      t("administrate.controller.create.success", resource: "Log entry")
    )
  end

  it "allows to type in the select field to find a match and select it", :js do
    _customer = create(:customer, name: "Brucey")
    _customer2 = create(:customer, name: "Nacho")

    visit new_admin_log_entry_path
    fill_in "Action", with: "create"
    find(".selectize-input").click
    find(".selectize-input").fill_in(with: "Brucey")
    find(".option", text: "Brucey").click
    click_on "Create Log entry"

    expect(page).to have_content("Brucey")
  end

  it "shows the selected logeable value" do
    customer = create(:customer)
    log_entry = create(:log_entry, logeable: customer)

    visit edit_admin_log_entry_path(log_entry)
    expected = customer.to_global_id.to_s
    expect(find_field("Logeable").value).to eq expected
  end
end
