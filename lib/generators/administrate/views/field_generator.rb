require "administrate/view_generator"

module Administrate
  module Generators
    module Views
      class FieldGenerator < Administrate::ViewGenerator
        def self.template_source_path
          File.expand_path(
            "../../../../../app/views/fields/",
            __FILE__,
          )
        end

        source_root template_source_path

        def copy_partials
          copy_field_partial(:index)
          copy_field_partial(:show)
          copy_field_partial(:form)
        end

        private

        def copy_field_partial(partial_name)
          resource_path = args.first.try(:underscore)
          template_file = "#{resource_path}/_#{partial_name}.html.erb"

          copy_file(
            template_file,
            "app/views/fields/#{template_file}",
          )
        end
      end
    end
  end
end
