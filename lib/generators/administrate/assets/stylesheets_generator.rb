require "rails/generators/base"

module Administrate
  module Generators
    module Assets
      class StylesheetsGenerator < Rails::Generators::Base
        STYLESHEETS_PATH = "lib/assets/stylesheets".freeze

        source_root File.expand_path("../../../../../", __FILE__)

        def copy_stylesheets
          destination_path = File.join(STYLESHEETS_PATH, "administrate")
          directory STYLESHEETS_PATH, destination_path
        end
      end
    end
  end
end
