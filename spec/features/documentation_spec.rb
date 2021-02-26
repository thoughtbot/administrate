require "rails_helper"

describe "documentation navigation" do
  it "shows a 404 for missing pages" do
    visit "not_a_page"

    expect(page).to have_http_status(:not_found)
  end

  it "shows the README" do
    visit(root_path)

    expect(page).to have_css("div.main h1", text: "Administrate")
    expect(page).to have_content(
      "A framework for creating flexible, powerful admin dashboards in Rails",
    )
  end

  it "shows the Contributing Guides" do
    visit("/contributing")

    expect(page).to have_css("div.main h1", text: "Contributing Guide")
    expect(page).to have_content(
      "We welcome pull requests from everyone.",
    )
  end

  it "shows the LICENSE in both forms" do
    visit("/license")

    expect(page).to have_content("The MIT License (MIT)")

    visit("/LICENSE.md")

    expect(page).to have_content("The MIT License (MIT)")
  end

  it "shows other docs pages" do
    visit("/getting_started")

    expect(page).to have_css("div.main h1", text: "Getting Started")
    expect(page).to have_content("Administrate is released as a Ruby gem")
  end

  it "shows nested docs pages" do
    visit("/guides/hiding_dashboards_from_sidebar")

    expect(page).to have_css("div.main h1", text: "Hiding Dashboards from")
    expect(page).to have_content("Resources can be removed form the sidebar")
  end

  it "links to each documentation page" do
    visit root_path
    links = internal_documentation_links

    expect(links).to_not be_empty

    links.each do |link|
      visit link
      expect(page).to have_http_status(:ok), "Unable to find #{link}"
    end
  end

  it "links to the GitHub repo" do
    visit root_path

    expect(github_link[:href]).
      to eq "https://github.com/thoughtbot/administrate"
  end

  private

  def github_link
    first(".sidebar-links").find("a", text: "GitHub")
  end

  def internal_documentation_links
    all(".sidebar a").
      map { |anchor| anchor[:href] }.
      select { |href| URI.parse(href).relative? }
  end
end
