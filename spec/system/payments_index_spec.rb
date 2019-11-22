require "rails_helper"

RSpec.describe "payment index page", type: SYSTEM_TEST do
  it "user views payment attributes" do
    payment = create(:payment)

    visit admin_payments_path

    expect(page).to have_header("Payments")
    expect(page).to have_content(payment.id)
  end

  it "user clicks through to the payment show page", :js do
    payment = create(:payment)

    visit admin_payments_path
    click_row_for(payment)

    expect(page).to have_header(displayed(payment))
  end

  it "user cannot click through to the edit page" do
    create(:payment)

    visit admin_payments_path
    expect(page).not_to have_button t("administrate.actions.edit")
  end

  it "user cannot click through to the new page" do
    visit admin_payments_path
    expect(page).not_to have_button "New payment"
  end

  it "user cannot delete record" do
    create(:payment)

    visit admin_payments_path
    expect(page).not_to have_button t("administrate.actions.destroy")
  end
end
