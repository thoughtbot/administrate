ENV["RAILS_ENV"] = "test"
require "dotenv"
Dotenv.load

require File.expand_path("../../spec/example_app/config/environment", __FILE__)

require "rspec/rails"
require "shoulda/matchers"
require "selenium/webdriver"

Dir[Rails.root.join("../../spec/support/**/*.rb")].each { |file| require file }

require "factories"

module Features
  # Extend this module in spec/support/features/*.rb
  include Formulaic::Dsl
end

RSpec.configure do |config|
  config.include Features, type: :feature
  config.include DashboardHelpers
  config.include ControllerHelpers
  config.infer_base_class_for_anonymous_controllers = false
  config.infer_spec_type_from_file_location!
  config.use_transactional_fixtures = false

  config.before(:each, type: :generator) do
    allow(Rails).to receive(:root).and_return(Pathname.new(file(".")))
  end
end

ActiveRecord::Migration.maintain_test_schema!

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.register_driver :headless_chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    chromeOptions: {
      args: %w[headless enable-features=NetworkService,NetworkServiceInProcess]
    }
  )
  Capybara::Selenium::Driver.new app,
    browser: :chrome,
    desired_capabilities: capabilities
end

Capybara.javascript_driver = :selenium_chrome_headless

Capybara.server = :webrick
