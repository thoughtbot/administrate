require "administrate/engine"

module Administrate
  module Config
    module ClassMethods
      attr_accessor :admin_directory
      @@admin_directory = "admin"
    end
    extend ClassMethods
  end

  def self.configure
    yield Administrate::Config
  end
end
