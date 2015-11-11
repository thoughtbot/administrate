require "rails_helper"

describe "edit form" do
  it "has the correct css class_name" do
    customer = create(:customer)

    visit edit_admin_customer_path(customer)

    expect(page).to have_css("form.form")
  end
end
