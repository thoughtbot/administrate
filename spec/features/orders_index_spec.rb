require "rails_helper"

feature "order index page" do
  scenario "user views order attributes" do
    order = create(:order)

    visit admin_orders_path

    expect(page).to have_header("Orders")
    expect(page).to have_content(order.id)
  end

  scenario "user clicks through to customer show page" do
    order = create(:order)

    visit admin_orders_path
    click_on(displayed(order.customer))

    expect(page).to have_header(order.customer.name)
  end

  scenario "user clicks through to the order show page", :js do
    order = create(:order)

    visit admin_orders_path
    click_row_for(order)

    expect(page).to have_header(displayed(order))
    expect(page).to have_link(order.customer.name)
  end

  scenario "user clicks through to the edit page" do
    order = create(:order)

    visit admin_orders_path
    click_on t("administrate.actions.edit")

    expect(page).to have_current_path(edit_admin_order_path(order))
  end

  scenario "user clicks through to the new page" do
    visit admin_orders_path
    click_on("New order")

    expect(page).to have_current_path(new_admin_order_path)
  end

  scenario "user deletes record", js: true do
    create(:order)

    visit admin_orders_path
    accept_confirm do
      click_on t("administrate.actions.destroy")
    end
    expect(page).to have_flash(
      t("administrate.controller.destroy.success", resource: "Order")
    )
  end

  scenario "cannot delete because associated payment", js: true do
    create(:payment, order: create(:order))

    visit admin_orders_path
    accept_confirm do
      click_on t("administrate.actions.destroy")
    end
    expect(page).to have_flash(
      "Cannot delete record because dependent payments exist", type: :error
    )
  end

  scenario "user sorts by belongs_to field" do
    create(:order, customer: create(:customer, name: "Alpha"))
    create(:order, customer: create(:customer, name: "Charlie"))
    create(:order, customer: create(:customer, name: "Bravo"))

    visit admin_orders_path

    click_on "Customer"
    within :table do
      expect(page).to have_css("tbody tr:nth-child(1)", text: "Alpha")
      expect(page).to have_css("tbody tr:nth-child(2)", text: "Bravo")
      expect(page).to have_css("tbody tr:nth-child(3)", text: "Charlie")
    end

    click_on "Customer"
    within :table do
      expect(page).to have_css("tbody tr:nth-child(1)", text: "Charlie")
      expect(page).to have_css("tbody tr:nth-child(2)", text: "Bravo")
      expect(page).to have_css("tbody tr:nth-child(3)", text: "Alpha")
    end
  end
end
