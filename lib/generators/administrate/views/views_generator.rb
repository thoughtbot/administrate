require "administrate/view_generator"

module Administrate
  module Generators
    class ViewsGenerator < Administrate::ViewGenerator
      def copy_templates
        call_generator("administrate:views:index", resource_path)
        call_generator("administrate:views:show", resource_path)
        call_generator("administrate:views:new", resource_path)
        call_generator("administrate:views:edit", resource_path)
      end
    end
  end
end
