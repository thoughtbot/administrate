source 'https://rubygems.org'

ruby "2.2.3"

gemspec

gem "delayed_job_active_record"
gem "high_voltage"
gem "pg"
gem "unicorn"

group :development do
  gem "web-console", ">= 2.1.3"
end

group :development, :test do
  gem "appraisal"
  gem "awesome_print"
  gem "bundler-audit", require: false
  gem "byebug"
  gem "dotenv-rails"
  gem "factory_girl_rails"
  gem "faker"
  gem "i18n-tasks"
  gem "pry-rails"

  # Using edge rspec to get rid of deprecation warnings about
  # fixtures and compatibility with rails-controller-testing.
  %w(core support expectations mocks rails).each do |part|
    gem "rspec-#{part}", github: "rspec/rspec-#{part}"
  end
end

group :test do
  # Rails 5 requires unreleased fixes in capybara
  # see https://github.com/jnicklas/capybara/issues/1592
  gem "capybara", github: "jnicklas/capybara"

  # We need unreleased Kaminari 0.17 for Rails 5 support
  # see https://github.com/amatsuda/kaminari/issues/759
  gem "kaminari", github: "amatsuda/kaminari", ref: "0-17-stable"

  # We also need master of rails-controller-testing for Rails 5
  gem "rails-controller-testing", github: "rails/rails-controller-testing"

  gem "ammeter"
  gem "database_cleaner"
  gem "formulaic"
  gem "launchy"
  # Fuubar requires rspec ~> 3.0
  # gem "fuubar"
  gem "percy-capybara"
  gem "poltergeist"
  gem "shoulda-matchers", "~> 2.8.0", require: false
  gem "timecop"
  gem "webmock"
end

group :staging, :production do
  gem "rack-timeout"
  gem "rails_stdout_logging"
  gem "uglifier"
end
