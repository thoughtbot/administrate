module AcceptanceHelpers
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

  def gem_path
    File.expand_path(Rails.root + "../../")
  end

  def setup_administrate
    session.append_to_file("Gemfile", "gem \"administrate\", path: \"#{gem_path}\"")
    session.run("bundle install")

    generate_dashboards_run = session.run(
      "bundle exec rails g administrate:install"
    )

    expect(generate_dashboards_run)
      .to be_a_success.and have_stdout("create  app/dashboards/post_dashboard.rb")
  end

  def setup_post_model
    new_post_cmd = session.run([
      "bundle exec rails g model post",
      "title:string",
      "body:text",
      "published_at:datetime"
    ].join(" "))

    expect(new_post_cmd)
      .to be_a_success.and have_stdout("create    app/models/post.rb")

    migrate_run = session.run("bundle exec rails db:migrate")

    expect(migrate_run).to be_a_success.and have_stdout("CreatePosts: migrated")
  end
end

RSpec.configure do |config|
  config.include Capybara::DSL, type: :black_box
  config.include Capybara::RSpecMatchers, type: :black_box
  config.include AcceptanceHelpers, type: :black_box

  config.before(:each, type: :black_box) do
    Capybara.current_driver = :chrome
    Capybara.run_server = false
    Capybara.app_host = "http://localhost:3000"
  end
end
