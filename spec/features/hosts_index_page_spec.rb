require "rails_helper"

feature "hosts index page" do
  scenario "user views hosts" do
    host = create(:host)

    visit admin_hosts_path

    expect(page).to have_header("Hosts")
    expect(page).to have_content(host.name)
  end
end
