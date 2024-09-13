require "rails_helper"

feature "Sort" do
  describe "sortable" do
    context "when the field is sortable" do
      it "is a link to sort by that field" do
        visit admin_customers_path
        expect(page).to have_link("Name")
      end
    end

    context "when the field is NOT sortable" do
      it "is not a link" do
        visit admin_customers_path
        expect(page).not_to have_link("Password")
      end
    end
  end

  scenario "admin sorts customers by name" do
    dan = create(:customer, name: "Dan Croak")
    bob = create(:customer, name: "Bob")
    alice = create(:customer, name: "Alice")

    visit admin_customers_path
    click_on "Name"

    expect(page).to have_css("table tr:nth-child(1)", text: alice.name)
    expect(page).to have_css("table tr:nth-child(2)", text: bob.name)
    expect(page).to have_css("table tr:nth-child(3)", text: dan.name)
  end

  scenario "admin sorts customers by nickname (virtual field)" do
    dan = create(:customer, name: "Dan Croak")
    bob = create(:customer, name: "Bob")
    alice = create(:customer, name: "Alice")

    visit admin_customers_path
    click_on "Nickname"

    expect(page).to have_css("table tr:nth-child(1)", text: alice.name)
    expect(page).to have_css("table tr:nth-child(2)", text: bob.name)
    expect(page).to have_css("table tr:nth-child(3)", text: dan.name)
  end

  scenario "admin sorts orders by address (virtual field)" do
    create(:order, address_zip: "651", address_state: "UT")
    create(:order, address_zip: "7", address_state: "WV")
    create(:order, address_zip: "59543-0366", address_state: "NJ")

    visit admin_orders_path
    click_on "Address"

    expect(page).to have_css("table tr:nth-child(1)", text: "NJ 59543-0366")
    expect(page).to have_css("table tr:nth-child(2)", text: "UT 651")
    expect(page).to have_css("table tr:nth-child(3)", text: "WV 7")
  end
end
