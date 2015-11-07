require "rails_helper"

RSpec.feature "Visual regressions" do
  after(:each) do |example|
    Percy::Capybara.snapshot(page, name: example.full_description)
  end

  scenario "customer index" do
    create_customer_with_fixed_info
    visit admin_customers_path
  end

  scenario "searching interactions", :js do
    visit admin_customers_path
    fill_in(:search, with: "Test search")
    sleep 1
  end

  scenario "customer with order" do
    customer = create_customer_with_fixed_info
    with_fixed_time { create(:order, customer: customer) }

    visit admin_customer_path(customer)
  end

  scenario "customer edit page" do
    customer = create_customer_with_fixed_info
    visit edit_admin_customer_path(customer)
  end

  scenario "new customer page" do
    visit new_admin_customer_path
  end

  def with_fixed_time
    Timecop.freeze(Time.new(2015)) { yield }
  end

  def create_customer_with_fixed_info
    with_fixed_time do
      create(:customer, name: "Sample Data", email: "sample@example.com")
    end
  end
end
