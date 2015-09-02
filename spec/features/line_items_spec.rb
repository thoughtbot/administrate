require "rails_helper"

RSpec.describe "line item index page" do
  it "displays line items' information" do
    line_item = create(:line_item)

    visit admin_line_items_path

    expect(page).to have_header("Line Items")
    expect(page).to have_content(line_item.unit_price)
    expect(page).to have_content(line_item.product.to_s)
  end

  it "links to the line item show page", :js do
    line_item = create(:line_item)

    visit admin_line_items_path
    click_row_for(line_item)

    expect(page).to have_header("Line Item ##{line_item.id}")
    expect(page).to have_content(line_item.product.to_s)
  end

  it "links to the edit page" do
    line_item = create(:line_item)

    visit admin_line_items_path
    click_on "Edit"

    expect(page).to have_header("Edit Line Item ##{line_item.id}")
  end

  it "links to the new page" do
    visit admin_line_items_path
    click_on("New line item")

    expect(page).to have_header("New Line Item")
  end
end
