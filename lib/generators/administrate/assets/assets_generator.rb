require "administrate/view_generator"

module Administrate
  module Generators
    class AssetsGenerator < Administrate::ViewGenerator
      def copy_assets
        Rails::Generators.invoke("administrate:assets:images")
        Rails::Generators.invoke("administrate:assets:javascripts")
        Rails::Generators.invoke("administrate:assets:stylesheets")
      end
    end
  end
end
