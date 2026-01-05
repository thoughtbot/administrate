require "rails_helper"
require "administrate/engine"

describe Administrate::Engine do
  if Gem::Version.new(::Rails::VERSION::STRING) >= Gem::Version.new("7.1")
    it "deprecator is added to application deprecators" do
      expect(Rails.application.deprecators[:administrate]).not_to be_nil
    end
  end
end
