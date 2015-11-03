ENV["RAILS_ENV"] = "test"

require File.expand_path("../../spec/example_app/config/environment", __FILE__)

require "rspec/rails"
require "shoulda/matchers"

Dir[Rails.root.join("../../spec/support/**/*.rb")].each { |file| require file }

require "factories"

module Features
  # Extend this module in spec/support/features/*.rb
  include Formulaic::Dsl
end

RSpec.configure do |config|
  config.include Features, type: :feature
  config.infer_base_class_for_anonymous_controllers = false
  config.infer_spec_type_from_file_location!
  config.use_transactional_fixtures = false
end

Capybara::Webkit.configure(&:block_unknown_urls)

ActiveRecord::Migration.maintain_test_schema!
Capybara.javascript_driver = :webkit
