require "rails_helper"

describe "documentation" do
  it "links to the Github repo" do
    visit root_path

    expect(github_link[:href]).
      to eq "https://github.com/thoughtbot/administrate"
  end

  private

  def github_link
    first(".sidebar-links").find("a", text: "GitHub")
  end
end
