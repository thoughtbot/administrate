require "webmock/rspec"
require "administrate/fields/string"
require "administrate/fields/email"
require "administrate/fields/number"
require "administrate/base_dashboard"

# http://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration
RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.syntax = :expect
  end

  config.mock_with :rspec do |mocks|
    mocks.syntax = :expect
  end

  config.order = :random
end

WebMock.disable_net_connect!(allow_localhost: true, allow: "percy.io")

class MockDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
    email: Administrate::Field::Email,
    phone: Administrate::Field::Number,
  }
end

class DashboardWithAnArrayOfScopes < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
  }

  COLLECTION_SCOPES = [:active, :old, "with_argument(3)", "idle"]
end

class DashboardWithAHashOfScopes < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
  }

  COLLECTION_SCOPES = {
    status: [:active, :inactive, "idle", "with_argument:*"],
    other: [:last_week, :old, "with_argument(3)",],
  }
end
