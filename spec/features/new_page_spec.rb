require "rails_helper"

describe "new customer page" do
  it "displays the correct header" do
    visit new_admin_customer_path

    expect(page).to have_header("New Customer")
  end
end
