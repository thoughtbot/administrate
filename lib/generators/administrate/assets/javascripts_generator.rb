require "rails/generators/base"

module Administrate
  module Generators
    module Assets
      class JavascriptsGenerator < Rails::Generators::Base
        JAVASCRIPTS_PATH = "lib/assets/javascript".freeze

        source_root File.expand_path("../../../../../", __FILE__)

        def copy_javascripts
          destination_path = File.join(JAVASCRIPTS_PATH, "administrate")
          directory JAVASCRIPTS_PATH, destination_path
        end
      end
    end
  end
end
