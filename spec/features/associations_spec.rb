require "rails_helper"

describe "Associations" do
  it "can associate to namespaced models on dashboards" do
    post = create(:blog_post)
    tag = create(:blog_tag, name: "foobarisms")
    post.tags << tag

    visit admin_blog_post_url(post)

    expect(page).to have_css(".cell-data", text: "foobarisms")
  end
end
