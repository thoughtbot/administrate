module AcceptanceHelpers
  def setup_capybara
    Capybara.current_driver = :chrome
    Capybara.run_server = false
    Capybara.app_host = "http://localhost:3000"
  end
end

RSpec.configure do |config|
  config.include Capybara::DSL, type: :black_box
  config.include Capybara::RSpecMatchers, type: :black_box
  config.include AcceptanceHelpers, type: :black_box
end
