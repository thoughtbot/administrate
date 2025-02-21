require "rails_helper"

RSpec.describe "with a Default Rails app" do
  it "works" do
    create_rails_application

    # setup_post_model
    # add_administrate
    # generate_administrate_dashboards

    # start_application

    # run_feature_tests
  end

  def create_rails_application
    session.create_file("Gemfile", <<~RUBY)
      source "http://rubygems.org"

      gem "rails"
    RUBY

    session.run("bundle install")

    rails_new_cmd = [
      "bundle exec rails new .",
      "--skip-bundle",
      "--skip-test",
      "--skip-coffee",
      "--skip-turbolinks",
      "--skip-spring",
      "--skip-bootsnap",
      "--force"
    ].join(" ")

    expect(session.run(rails_new_cmd))
      .to be_a_success.and have_stdout("force  Gemfile")
  end

  def session
    @session ||= JetBlack::Session.new(options: {clean_bundler_env: true})
  end
end
