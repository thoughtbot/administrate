require "rails_helper"

describe "customer form" do
  describe "date field" do
    it "responds to the date picker date format", :js do
      customer = create(:customer)

      visit edit_admin_customer_path(customer)
      select_from_datepicker(Date.new(1989, 10, 31))
      click_on "Update Customer"

      expect(page).to have_content("10/31/1989")
    end

    it "populates and persists the existing value", :js do
      date = Date.new(1989, 10, 31)
      customer = create(:customer, birthdate: date)

      visit edit_admin_customer_path(customer)
      click_on "Update Customer"

      expect(customer.reload.birthdate).to eq(date)
    end

    def select_from_datepicker(date)
      page.execute_script(<<-JS)
        var date = moment("#{date}", "YYYY-MM-DD hh:mm:ss");
        $(".datepicker").data("DateTimePicker").date(date);
      JS
    end
  end
end
