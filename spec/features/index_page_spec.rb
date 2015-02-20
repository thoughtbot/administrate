require "rails_helper"

RSpec.describe "customer index page" do
  it "displays customers' name and email" do
    customer = create(:customer)

    visit("/customers")

    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end
end
