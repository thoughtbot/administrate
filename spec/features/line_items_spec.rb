require "rails_helper"

RSpec.describe "line item index page" do
  it "displays line items' information" do
    line_item = create(:line_item)

    visit line_items_path

    expect(page).to have_header("Line Items")
    expect(page).to have_content(line_item.to_s)
    expect(page).to have_content(line_item.product.to_s)
  end

  it "links to the line item show page" do
    line_item = create(:line_item)

    visit line_items_path
    click_on line_item.to_s

    expect(current_path).to eq(line_item_path(line_item))
    expect(page).to have_content(line_item.to_s)
    expect(page).to have_content(line_item.product.to_s)
  end

  it "links to the edit page" do
    line_item = create(:line_item)

    visit line_items_path
    click_on "Edit"

    expect(current_path).to eq(edit_line_item_path(line_item))
  end

  it "links to the new page" do
    visit line_items_path
    click_on("New line item")

    expect(current_path).to eq(new_line_item_path)
  end
end
