require "rails_helper"

RSpec.describe "payment index page" do
  it "displays payments' id and receipt link" do
    payment = create(:payment)

    visit admin_payments_path

    expect(page).to have_header("Payments")
    expect(page).to have_content(payment.id)
    expect(page).to have_content("receipt-#{payment.id}.pdf")
  end

  it "links to the payment show page", :js do
    payment = create(:payment)

    visit admin_payments_path
    click_row_for(payment)

    expect(page).to have_content(payment.id)
    expect(current_path).to eq(admin_payment_path(payment))
  end
end
