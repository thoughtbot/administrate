require "administrate/view_generator"

module Administrate
  module Generators
    module Views
      class SidebarGenerator < Administrate::ViewGenerator
        source_root template_source_path

        def copy_sidebar
          copy_resource_template("_sidebar")
        end
      end
    end
  end
end
