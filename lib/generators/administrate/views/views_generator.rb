require "administrate/view_generator"

module Administrate
  module Generators
    class ViewsGenerator < Administrate::ViewGenerator
      def copy_templates
        call_generator("administrate:views:index", *args)
        call_generator("administrate:views:show", *args)
        call_generator("administrate:views:new", *args)
        call_generator("administrate:views:edit", *args)
      end
    end
  end
end
