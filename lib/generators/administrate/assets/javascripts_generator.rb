require "rails/generators/base"

module Administrate
  module Generators
    module Assets
      class JavascriptsGenerator < Rails::Generators::Base
        JAVASCRIPTS_PATH = "lib/assets/javascript"

        source_root File.expand_path("../../../../../", __FILE__)

        def copy_javascripts
          directory JAVASCRIPTS_PATH, File.join(JAVASCRIPTS_PATH, "administrate")
        end
      end
    end
  end
end
