if Rails.env.development? || Rails.env.test?
  require "factory_bot"

  namespace :dev do
    desc "Seed data for development environment"
    task prime: "db:setup" do
      include FactoryBot::Syntax::Methods

      # create(:user, email: "user@example.com", password: "password")
    end
  end
end
