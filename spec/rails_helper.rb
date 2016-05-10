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
  config.infer_base_class_for_anonymous_controllers = false
  config.infer_spec_type_from_file_location!
  config.use_transactional_fixtures = false

  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  config.filter_gems_from_backtrace("bundler", "rack")

  # filter specs
  config.filter_run focus: true
  config.run_all_when_everything_filtered = true

  config.before(:each, type: :generator) do
    allow(Rails).to receive(:root).and_return(Pathname.new(file(".")))
  end
end

ActiveRecord::Migration.maintain_test_schema!
Capybara.javascript_driver = :poltergeist
