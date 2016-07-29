require "webmock/rspec"

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

RSpec.shared_context "fake_field_label" do
  before do
    allow(view).to receive(:field_label_text) do |_resource_name, field_name|
      field_name.to_s
    end
    allow(view).to receive(:resource_name).and_return("spec_model")
  end
end

WebMock.disable_net_connect!(allow_localhost: true)
