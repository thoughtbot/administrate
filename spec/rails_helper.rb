ENV["RAILS_ENV"] = "test"
require "dotenv"
Dotenv.load

require File.expand_path("../../spec/example_app/config/environment", __FILE__)

require "rspec/rails"
require "shoulda/matchers"

if defined?(ActionDispatch::SystemTestCase)
  SYSTEM_TEST = :system
else
  SYSTEM_TEST = :feature

  require_relative "./compatibility/database_cleaner"
end

Dir[Rails.root.join("../../spec/support/**/*.rb")].each { |file| require file }

require "factories"

module SystemHelpers
  # Extend this module in spec/support/system_helpers/*.rb
  include Formulaic::Dsl
end

RSpec.configure do |config|
  config.include SystemHelpers, type: SYSTEM_TEST
  config.include DashboardHelpers
  config.include ControllerHelpers
  config.infer_base_class_for_anonymous_controllers = false
  config.infer_spec_type_from_file_location!
  config.use_transactional_fixtures = defined?(ActionDispatch::SystemTestCase)

  config.before(:each, type: :generator) do
    allow(Rails).to receive(:root).and_return(Pathname.new(file(".")))
  end
end

ActiveRecord::Migration.maintain_test_schema!
