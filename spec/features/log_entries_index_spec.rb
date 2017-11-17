require "rails_helper"

feature "log entries index page" do
  scenario "user views log entries" do
    log_entry = create(:log_entry, action: "test-action")

    visit admin_log_entries_path

    expect(page).to have_header("Log Entries")
    expect(page).to have_content(log_entry.action)
    expect(page).to have_content(displayed(log_entry.logeable))
  end

  scenario "user clicks through to customer show page" do
    customer = create(:customer)
    create(:log_entry, logeable: customer)

    visit admin_log_entries_path
    click_on(displayed(customer))

    expect(page).to have_header(customer.name)
  end

  scenario "user clicks through to the log entry show page", :js do
    customer = create(:customer)
    log_entry = create(:log_entry, logeable: customer)

    visit admin_log_entries_path
    click_row_for(log_entry)

    expect(page).to have_header(displayed(log_entry))
    expect(page).to have_link(customer.name)
  end

  scenario "user clicks through to the edit page" do
    log_entry = create(:log_entry)

    visit admin_log_entries_path
    click_on t("administrate.actions.edit")

    expect(current_path).to eq(edit_admin_log_entry_path(log_entry))
  end

  scenario "user clicks through to the new page" do
    visit admin_log_entries_path
    click_on("New log entry")

    expect(current_path).to eq(new_admin_log_entry_path)
  end

  scenario "user deletes record" do
    create(:log_entry)

    visit admin_log_entries_path
    click_on t("administrate.actions.destroy")

    expect(page).to have_flash(
      t("administrate.controller.destroy.success", resource: "LogEntry"),
    )
  end
end
