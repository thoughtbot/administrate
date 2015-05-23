require "rails_helper"

feature "order index page" do
  scenario "displays line item information" do
    line_item = create(:line_item)

    visit order_path(line_item.order)

    expect(page).to have_content(line_item.unit_price)
    expect(page).to have_content(line_item.quantity)
    expect(page).to have_content(line_item.total_price)
  end

  scenario "links to line items", :js do
    line_item = create(:line_item)

    visit order_path(line_item.order)
    find(index_row_css_for(line_item)).click

    expect(page).to have_header(line_item.to_s)
  end
end
