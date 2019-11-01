ENV["RAILS_ENV"] = "test"
require "dotenv"
Dotenv.load

require File.expand_path("../../spec/example_app/config/environment", __FILE__)

require "rspec/rails"
require "shoulda/matchers"
require "capybara/poltergeist"

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
Capybara.javascript_driver = :poltergeist
Capybara.register_driver :poltergeist do |app|
  options = { phantomjs_options: ["--load-images=no"] }
  Capybara::Poltergeist::Driver.new(app, options)
end

Capybara.server = :webrick
