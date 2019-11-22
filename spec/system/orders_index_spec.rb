require "rails_helper"

RSpec.describe "order index page", type: SYSTEM_TEST do
  it "user views order attributes" do
    order = create(:order)

    visit admin_orders_path

    expect(page).to have_header("Orders")
    expect(page).to have_content(order.id)
  end

  it "user clicks through to customer show page" do
    order = create(:order)

    visit admin_orders_path
    click_on(displayed(order.customer))

    expect(page).to have_header(order.customer.name)
  end

  it "user clicks through to the order show page", :js do
    order = create(:order)

    visit admin_orders_path
    click_row_for(order)

    expect(page).to have_header(displayed(order))
    expect(page).to have_link(order.customer.name)
  end

  it "user clicks through to the edit page" do
    order = create(:order)

    visit admin_orders_path
    click_on t("administrate.actions.edit")

    expect(current_path).to eq(edit_admin_order_path(order))
  end

  it "user clicks through to the new page" do
    visit admin_orders_path
    click_on("New order")

    expect(current_path).to eq(new_admin_order_path)
  end

  it "user deletes record" do
    create(:order)

    visit admin_orders_path
    click_on t("administrate.actions.destroy")

    expect(page).to have_flash(
      t("administrate.controller.destroy.success", resource: "Order")
    )
  end

  it "cannot delete because associated payment" do
    create(:payment, order: create(:order))

    visit admin_orders_path
    click_on t("administrate.actions.destroy")

    expect(page).to have_flash(
      "Cannot delete record because dependent payments exist", type: :error
    )
  end
end
