require "rails_helper"

feature "form errors" do
  scenario "error messages for new resource" do
    visit new_admin_customer_path
    fill_in("Name", with: "")
    click_on "Create Customer"

    expect(page).to have_content "Name can't be blank"
  end

  scenario "error messages for editing resource" do
    customer = create(:customer)

    visit edit_admin_customer_path(customer)
    fill_in("Name", with: "")
    click_on "Update Customer"

    expect(page).to have_content "Name can't be blank"
  end
end
