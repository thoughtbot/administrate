require "rails_helper"

describe "edit form" do
  it "has the correct css class_name" do
    customer = create(:customer)

    visit edit_admin_customer_path(customer)

    expect(page).to have_css("form.form")
  end

  it "displays translated labels" do
    custom_label = "Newsletter Subscriber"

    translations = {
      helpers: {
        label: {
          customer: {
            email_subscriber: custom_label,
          },
        },
      },
    }

    with_translations(:en, translations) do
      visit new_admin_customer_path

      expect(page).to have_label(custom_label)
    end
  end
end
