source "https://rubygems.org"
ruby "3.2.2" unless ENV["CI"]

gemspec

gem "administrate-field-image"
gem "faker"
gem "front_matter_parser"
gem "globalid"
gem "kaminari-i18n"
gem "pg"
gem "pundit"
gem "redcarpet"
gem "sentry-rails"
gem "sentry-ruby"
gem "unicorn"

gem "cssbundling-rails", "~> 1.2"
gem "jsbundling-rails", "~> 1.1"
gem "sprockets-rails", "~> 3.4"

group :development, :test do
  gem "appraisal"
  gem "awesome_print"
  gem "byebug"
  gem "dotenv-rails"
  gem "factory_bot_rails"
  gem "i18n-tasks", "1.0.14"
  gem "pry"
  gem "standard"
  gem "yard"
end

group :test do
  gem "ammeter"
  gem "capybara"
  gem "database_cleaner"
  gem "formulaic"
  gem "launchy"
  gem "selenium-webdriver"
  gem "shoulda-matchers"
  gem "timecop"
  gem "webmock"
  gem "webrick"
  gem "xpath", "3.2.0"
end

group :staging, :production do
  gem "rack-timeout"
  gem "uglifier"
end
