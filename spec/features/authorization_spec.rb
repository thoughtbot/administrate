require "rails_helper"

describe "authorization" do
  it "shows link to resource for which index? is authorized" do
    visit admin_customers_path
    navigation = find(".navigation")
    expect(navigation).to have_link("Products")
  end

  it "hides link to resource for which index? is not authorized" do
    visit admin_customers_path
    navigation = find(".navigation")
    expect(navigation).not_to have_link("Orders")
  end
end
