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
      customer = create(:customer, birth_date: date)

      visit edit_admin_customer_path(customer)
      click_on "Update Customer"

      expect(customer.reload.birth_date).to eq(date)
    end

    def select_from_datepicker(date)
      page.execute_script(<<-JS)
        var date = moment("#{date}", "YYYY-MM-DD");
        $(".datepicker").data("DateTimePicker").date(date);
      JS
    end
  end

  describe "time field" do
    it "responds to the date picker time format", :js do
      customer = create(:customer)

      visit edit_admin_customer_path(customer)
      select_from_timepicker("15:45:33")
      click_on "Update Customer"

      expect(page).to have_content("15:45:33")
    end

    it "populates and persists the existing value", :js do
      time = Time.zone.local(2000, 1, 1, 15, 45, 33)
      customer = create(:customer, birth_time: time)

      visit edit_admin_customer_path(customer)
      click_on "Update Customer"

      expect(customer.reload.birth_time).to eq(time)
    end

    def select_from_timepicker(time_string)
      page.execute_script(<<-JS)
        var date = moment("#{time_string}", "hh:mm:ss");
        $(".timepicker").data("DateTimePicker").date(date);
      JS
    end
  end
end
