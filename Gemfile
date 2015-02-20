source "https://rubygems.org"

ruby "2.2.0"

gem "airbrake"
gem "bourbon", "~> 4.1.0"
gem "coffee-rails", "~> 4.1.0"
gem "delayed_job_active_record"
gem "email_validator"
gem "flutie"
gem "high_voltage"
gem "i18n-tasks"
gem "jquery-rails"
gem "neat", "~> 1.7.0"
gem "newrelic_rpm"
gem "normalize-rails", "~> 3.0.0"
gem "pg"
gem "rack-timeout"
gem "rails", "4.2.0"
gem "recipient_interceptor"
gem "refills"
gem "sass-rails", "~> 5.0"
gem "simple_form"
gem "title"
gem "uglifier"
gem "unicorn"

group :development do
  gem "spring"
  gem "spring-commands-rspec"
  gem "web-console"
end

group :development, :test do
  gem "awesome_print"
  gem "bundler-audit", require: false
  gem "byebug"
  gem "dotenv-rails"
  gem "factory_girl_rails"
  gem "pry-rails"
  gem "rspec-rails", "~> 3.1.0"
end

group :test do
  gem "capybara-webkit", ">= 1.2.0"
  gem "database_cleaner"
  gem "formulaic"
  gem "launchy"
  gem "shoulda-matchers", require: false
  gem "timecop"
  gem "webmock"
end

group :staging, :production do
  gem "rails_stdout_logging"
end
