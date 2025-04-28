require "rails_helper"

RSpec.describe "Admin creates a new tag", type: :feature, js: true do
  it "allows selecting a resource and submitting the form" do
    _blog_post = create(:blog_post, title: "How to Bake Bread")
    _blog_post2 = create(:blog_post, title: "How to Play Guitar")

    visit "/admin/blog/tags/new"
    find(".selectize-input").click
    find(".selectize-input").fill_in(with: "Bake Bread")
    find(".option", text: "How to Bake Bread").click
    click_button "Create Tag"

    expect(page).to have_content("How to Bake Bread")
  end
end
