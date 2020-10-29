require "administrate/view_generator"

module Administrate
  module Generators
    module Views
      module Index
        class ActionsGenerator < Administrate::ViewGenerator
          source_root template_source_path

          def copy_template
            copy_resource_template("_action_headers")
            copy_resource_template("_actions")
          end
        end
      end
    end
  end
end
