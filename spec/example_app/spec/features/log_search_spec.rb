require "rails_helper"

RSpec.feature "Log search", type: :feature do
  it "filters logs related to a customer name", :js do
    c1 = create(:customer, name: "John Petrucci")
    c2 = create(:customer, name: "John Myung")
    c3 = create(:customer, name: "James LaBrie")
    o1a = create(:order, customer: c1)
    o2 = create(:order, customer: c2)
    o3 = create(:order, customer: c3)
    o1b = create(:order, customer: c1)

    [c1, c2, o1a, c3, o2, o3, o1b].each do |record|
      create(:log_entry, logeable: record)
    end

    visit admin_log_entries_path
    expect(page).to have_records_table(rows: 7)

    fill_in :search, with: "John"
    submit_search
    expect(page).to have_records_table(rows: 5)
  end

  def have_records_table(rows:)
    have_css("[role=main] table tr[data-url]", count: rows)
  end

  def submit_search
    page.execute_script("$('.search').submit()")
  end
end
