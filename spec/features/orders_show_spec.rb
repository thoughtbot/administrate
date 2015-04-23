require "rails_helper"

feature "order index page" do
  scenario "displays line item information" do
    line_item = create(:line_item)

    visit order_path(line_item.order)

    expect(page).to have_content(line_item.unit_price)
    expect(page).to have_content(line_item.quantity)
    expect(page).to have_content(line_item.total_price)
    expect(page).to have_link(line_item.product.to_s)
  end

  scenario "links to line items" do
    line_item = create(:line_item)

    visit order_path(line_item.order)
    click_on(line_item.to_s)

    expect(page).to have_header(line_item.to_s)
  end
end
