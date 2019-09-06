source 'https://rubygems.org'

gemspec

gem "administrate-field-image"
gem "autoprefixer-rails"
gem "faker"
gem "globalid"
gem "pg"
gem "redcarpet"
gem "sentry-raven"
gem "unicorn"

group :development, :test do
  gem "appraisal"
  gem "awesome_print"
  gem "bundler-audit", require: false
  gem "byebug"
  gem "dotenv-rails"
  gem "factory_bot_rails"
  gem "i18n-tasks", "0.9.29"
  gem "pry-rails"
end

group :test do
  gem "ammeter"
  gem "capybara", "3.29.0"
  gem "database_cleaner"
  gem "formulaic"
  gem "launchy"
  gem "poltergeist"
  gem "pundit"
  gem "shoulda-matchers"
  gem "timecop"
  gem "webmock"
  gem "xpath", "3.2.0"
end

group :staging, :production do
  gem "rack-timeout"
  gem "rails_stdout_logging"
  gem "uglifier"
end
