require "rails_helper"

RSpec.describe "with a Default Rails app" do
  it "works" do
    create_rails_application

    session.run("bundle")

    # setup_post_model
    # add_administrate
    # generate_administrate_dashboards

    # Bundler.with_unbundled_env do
    #   Dir.chdir session.directory do
    #     system "bundle" # we need to bundle before we're able to run the server
    #     process = SackRace::Process.new("bundle exec rails s", {verbose: true})

    #     binding.irb
    #   end
    # end

    Bundler.with_unbundled_env do
      process = SackRace::Process.new("bundle exec rails s", {chdir: session.directory, verbose: true})
      # process.add_handler(:ready, "Use Ctrl-C to stop\n")
      # process.start

      # process.wait_for_handler(:ready)
      binding.irb
    end

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
