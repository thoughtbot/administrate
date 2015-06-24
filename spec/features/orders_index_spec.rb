require "rails_helper"

describe "order index page" do
  it "displays the order id" do
    order = create(:order)

    visit admin_orders_path

    expect(page).to have_header("Orders")
    expect(page).to have_content(order.id)
  end

  it "links to the customer" do
    order = create(:order)

    visit admin_orders_path
    click_on(order.customer.to_s)

    expect(page).to have_header(order.customer.name)
  end

  it "links to the order show page", :js do
    order = create(:order)

    visit admin_orders_path
    click_row_for(order)

    expect(page).to have_header(order.to_s)
    expect(page).to have_link(order.customer.name)
  end

  it "links to the edit page" do
    order = create(:order)

    visit admin_orders_path
    click_on "Edit"

    expect(current_path).to eq(edit_admin_order_path(order))
  end

  it "links to the new page" do
    visit admin_orders_path
    click_on("New order")

    expect(current_path).to eq(new_admin_order_path)
  end
end
