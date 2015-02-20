RSpec.configure do |config|
  config.before(:each) do
    ActionMailer::Base.deliveries.clear
  end
end
