require "rails/generators/base"

module Administrate
  module Generators
    module Assets
      class ImagesGenerator < Rails::Generators::Base
        IMAGES_PATH = "app/assets/images/administrate"

        source_root File.expand_path("../../../../../", __FILE__)

        def copy_images
          directory IMAGES_PATH, IMAGES_PATH
        end
      end
    end
  end
end
