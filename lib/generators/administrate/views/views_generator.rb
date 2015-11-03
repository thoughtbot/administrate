require "administrate/view_generator"

module Administrate
  module Generators
    class ViewsGenerator < Administrate::ViewGenerator
      def copy_templates
        Rails::Generators.invoke("administrate:views:index", [resource_path])
        Rails::Generators.invoke("administrate:views:show", [resource_path])
        Rails::Generators.invoke("administrate:views:new", [resource_path])
        Rails::Generators.invoke("administrate:views:edit", [resource_path])
      end
    end
  end
end
