# This file is used by Rack-based servers to start the application.

require_relative "config/environment"

run Rails.application

if Gem::Version.new(Rails.version) >= Gem::Version.new("6.1")
  Rails.application.load_server
end
