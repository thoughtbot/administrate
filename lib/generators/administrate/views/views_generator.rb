require "administrate/view_generator"

module Administrate
  module Generators
    class ViewsGenerator < Administrate::ViewGenerator
      def copy_templates
        call_generator("administrate:views:index", resource_path, "--namespace", namespace)
        call_generator("administrate:views:show", resource_path, "--namespace", namespace)
        call_generator("administrate:views:new", resource_path, "--namespace", namespace)
        call_generator("administrate:views:edit", resource_path, "--namespace", namespace)
      end
    end
  end
end
