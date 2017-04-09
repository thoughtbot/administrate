require "rails_helper"

feature "payment index page" do
  scenario "user views payment attributes" do
    payment = create(:payment)

    visit admin_payments_path

    expect(page).to have_header("Payments")
    expect(page).to have_content(payment.id)
  end

  scenario "user clicks through to the payment show page", :js do
    payment = create(:payment)

    visit admin_payments_path
    click_row_for(payment)

    expect(page).to have_header(displayed(payment))
  end

  scenario "user cannot click through to the edit page" do
    create(:payment)

    visit admin_payments_path
    expect(page).not_to have_button t("administrate.actions.edit")
  end

  scenario "user cannot click through to the new page" do
    visit admin_payments_path
    expect(page).not_to have_button "New payment"
  end

  scenario "user cannot delete record" do
    create(:payment)

    visit admin_payments_path
    expect(page).not_to have_button t("administrate.actions.destroy")
  end
end
