require "administrate/engine"

module Administrate
  module Config
    @admin_directory = "admin"

    module ClassMethods
      attr_accessor :admin_directory

      def admin_namespace
        admin_directory.camelize
      end
    end
    extend ClassMethods
  end

  def self.configure
    yield Administrate::Config
  end
end
