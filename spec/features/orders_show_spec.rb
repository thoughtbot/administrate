require "rails_helper"

feature "order show page" do
  scenario "displays line item information" do
    line_item = create(:line_item)

    visit admin_order_path(line_item.order)

    expect(page).to have_content(line_item.unit_price)
    expect(page).to have_content(line_item.quantity)
    expect(page).to have_content(line_item.total_price)
  end

  scenario "links to line items", :js do
    line_item = create(:line_item)

    visit admin_order_path(line_item.order)
    click_row_for(line_item)

    expect(page).to have_header(displayed(line_item))
  end
end
