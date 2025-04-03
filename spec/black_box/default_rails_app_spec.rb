require "rails_helper"
require "capybara/dsl"

RSpec.describe "with a Default Rails app" do
  include Capybara::DSL

  it "works" do
    setup_capybara
    create_rails_application

    # setup_post_model
    # add_administrate
    # generate_administrate_dashboards

    start_and_wait_for_ready

    visit("/")

    expect(page).to have_content("Rails version: 8.0.2")

    process.stop
  end

  def create_rails_application
    session.create_file("Gemfile", <<~RUBY)
      source "http://rubygems.org"

      gem "rails"
    RUBY

    session.run("bundle install")

    rails_new_cmd = [
      "bundle exec rails new .",
      "--skip-test",
      "--skip-spring",
      "--force"
    ].join(" ")

    expect(session.run(rails_new_cmd))
      .to be_a_success.and have_stdout("force  Gemfile")
  end

  def session
    @session ||= JetBlack::Session.new(options: {clean_bundler_env: true})
  end

  def setup_capybara
    Capybara.current_driver = :chrome
    Capybara.run_server = false
    Capybara.app_host = "http://localhost:3000"
  end

  def start_and_wait_for_ready
    Bundler.with_unbundled_env do
      process.add_handler(:ready, "Use Ctrl-C to stop\n")
      process.start
      process.wait_for_handler(:ready)
    end
  end

  def process
    @process ||=
      Bundler.with_unbundled_env do
        SackRace::Process.new(
          "bundle exec rails server",
          {
            chdir: session.directory,
            verbose: true
          }
        )
      end
  end
end
