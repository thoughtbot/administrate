require "rails/generators/base"

module Administrate
  module Generators
    module Assets
      class StylesheetsGenerator < Rails::Generators::Base
        STYLESHEETS_PATH = "lib/assets/stylesheets"

        source_root File.expand_path("../../../../../", __FILE__)

        def copy_stylesheets
          directory STYLESHEETS_PATH, File.join(STYLESHEETS_PATH, "administrate")
        end
      end
    end
  end
end
