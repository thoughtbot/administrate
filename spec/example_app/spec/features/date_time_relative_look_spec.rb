require "rails_helper"

RSpec.feature "DateTime relative look", type: :feature do
  let(:c1) { create(:customer, name: "John Petrucci") }
  let(:o1) { create(:order, customer: c1) }

  it "renders the created_at field with a relative look on the index page" do
    create(:log_entry, action: "create", logeable: o1, created_at: 2.days.ago)

    visit admin_log_entries_path

    expect(page).to have_content("2 days")
  end

  it "renders the created_at field with a default look on the show page" do
    log_entry = create(:log_entry, action: "create", logeable: o1, created_at: 3.hours.ago)
    formatted_date_time = Administrate::Field::DateTime.new(:created_at, log_entry.created_at, :show).datetime

    visit admin_log_entry_path(log_entry)

    expect(page).to have_content(formatted_date_time)
  end
end
