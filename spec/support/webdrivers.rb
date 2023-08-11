require "selenium/webdriver"

Webdrivers::Chromedriver.required_version = "114.0.5735.90"

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.register_driver :headless_chrome do |app|
  options = ::Selenium::WebDriver::Chrome::Options.new
  options.add_argument "--headless=new"
  options.add_argument "--window-size=1680,1050"
  options.add_argument "--disable-gpu"
  options.add_argument "--disable-dev-shm-usage"

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.javascript_driver = :headless_chrome
Capybara.server = :webrick

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, type: :system, js: true) do
    driven_by Capybara.javascript_driver
  end
end
