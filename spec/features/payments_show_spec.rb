require "rails_helper"

feature "payment show page" do
  scenario "user cannot click through to the edit page" do
    payment = create(:payment)

    visit admin_payment_path(payment)
    expect(page).not_to have_button t("administrate.actions.edit")
  end

  scenario "user cannot delete record" do
    payment = create(:payment)

    visit admin_payment_path(payment)
    expect(page).not_to have_button t("administrate.actions.destroy")
  end
end
