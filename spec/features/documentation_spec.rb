require "rails_helper"

describe "documentation navigation" do
  it "shows a 404 for missing pages" do
    visit "not_a_page"

    expect(page).to have_http_status(:not_found)
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

  it "links to the Github repo" do
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
