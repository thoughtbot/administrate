module Administrate
  module Generators
    class FieldGenerator < Rails::Generators::NamedBase
      class_option(
        :look,
        type: :string,
        desc: "Specify the look for the field",
        default: ""
      )

      source_root File.expand_path("../templates", __FILE__)

      def template_field_object
        template(
          "field_object.rb.erb",
          "app/fields/#{file_name}_field.rb"
        )
      end

      def copy_partials
        copy_partial(:show)
        copy_partial(:index)
        copy_partial(:form)
      end

      private

      def look
        options[:look]
      end

      def copy_partial(partial_name)
        partial = "_#{partial_name}.html.erb"
        looks_dir = look.present? ? "looks/#{look}/" : ""

        copy_file(
          partial,
          "app/views/fields/#{file_name}_field/#{looks_dir}#{partial}"
        )
      end
    end
  end
end
