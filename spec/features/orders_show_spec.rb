require "rails_helper"

feature "order show page" do
  scenario "displays line item information" do
    line_item = create(:line_item)
    state_name = OrderDecorator.state_by_abbr(line_item.order.address_state)
    state_code = line_item.order.address_state

    visit admin_order_path(line_item.order)

    expect(page).to have_content(line_item.unit_price)
    expect(page).to have_content(line_item.quantity)
    expect(page).to have_content(line_item.total_price)
    expect(state_name.length > state_code.length).to be_truthy
    expect(page).to have_content(state_name)
  end

  scenario "links to line items", :js do
    line_item = create(:line_item)

    visit admin_order_path(line_item.order)
    click_row_for(line_item)

    expect(page).to have_header(displayed(line_item))
  end

  scenario "user cannot click through to payment edit page" do
    payment = create(:payment)

    visit admin_order_path(payment.order)

    within("table") do
      expect(page).not_to have_link t("administrate.actions.edit")
    end
  end

  scenario "user cannot click through to payment delete record" do
    payment = create(:payment)

    visit admin_order_path(payment.order)

    within("table") do
      expect(page).not_to have_link t("administrate.actions.destroy")
    end
  end
end
