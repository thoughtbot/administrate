require "rails_helper"

RSpec.describe "Custom style" do
  it "is applied", :js do
    visit admin_customers_path
    expect(page).to_not have_css(".custom-administrate-css-hidden")
    page.execute_script("$('.custom-administrate-css-hidden').show()")
    expect(page).to have_css(".custom-administrate-css-hidden")
  end
end
