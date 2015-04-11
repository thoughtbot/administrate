require "rails_helper"

RSpec.describe "order index page" do
  pending "displays orders' name and description" do
    order = create(:order)

    visit orders_path

    expect(page).to have_header("Orders")
    expect(page).to have_content(order.id)
    expect(page).to have_link(order.customer.name)
  end

  pending "links to the order show page" do
    order = create(:order)

    visit orders_path
    click_on order.id

    expect(current_path).to eq(order_path(order))
    expect(page).to have_link(order.customer.name)
  end

  it "links to the edit page" do
    order = create(:order)

    visit orders_path
    click_on "Edit"

    expect(current_path).to eq(edit_order_path(order))
  end

  it "links to the new page" do
    visit orders_path
    click_on("New order")

    expect(current_path).to eq(new_order_path)
  end
end
