require "administrate/view_generator"

module Administrate
  module Generators
    module Views
      class IndexGenerator < Administrate::ViewGenerator
        source_root template_source_path

        def copy_template
          copy_resource_template("index")
          copy_resource_template("_collection")
          copy_resource_template("_action_headers")
          copy_resource_template("_actions")
        end
      end
    end
  end
end
