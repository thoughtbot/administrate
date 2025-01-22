require "rails_helper"

RSpec.describe "with a Default Rails app" do
  it "works" do
    create_rails_application
    setup_post_model
    setup_administrate

    app.start_and_wait_for_ready

    visit("/admin")

    expect(page).to have_css("header h1#page-title", text: "Posts")
    click_on "New post"

    fill_in "Body", with: "Some words!"
    fill_in "Title", with: "A post with words"
    click_button "Create Post"

    expect(page).to have_content("Post was successfully created.")
    expect(page).to have_content("Show Post #1")

    app.stop
  end

  def session
    @session ||= JetBlack::Session.new(options: {clean_bundler_env: true})
  end

  def app
    @app ||= RailsProcess.new(session)
  end
end
