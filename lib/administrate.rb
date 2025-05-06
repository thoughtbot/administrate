require "administrate/engine"
require "administrate/version"

module Administrate
  def self.deprecator
    @deprecator ||= ActiveSupport::Deprecation.new(VERSION, "Administrate")
  end
end
