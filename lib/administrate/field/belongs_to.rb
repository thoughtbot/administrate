require_relative "associative"

module Administrate
  module Field
    class BelongsTo < Associative
      def self.permitted_attribute(attr, options = {})
        resource_class = options[:resource_class]
        foreign_key_for(resource_class, attr)
      end

      def self.eager_load?
        true
      end

      def permitted_attribute
        foreign_key
      end

      def associated_resource_options
        candidate_resources.map do |resource|
          [
            display_candidate_resource(resource),
            resource.send(association_primary_key)
          ]
        end
      end

      def selected_option
        data&.send(association_primary_key)
      end

      def tag_options
        {include_blank: selectize_include_blank}
      end

      def html_options
        {
          placeholder: selectize_placeholder,
          data: {
            controller: html_controller,
            **selectize_required_options
          }
        }
      end

      def include_blank_option
        options.fetch(:include_blank, true)
      end

      def selectize_include_blank
        if include_blank_option === true
          # I18n.t(:"helpers.select.prompt")
          "---" # Workaround for https://github.com/selectize/selectize.js/issues/1498
        elsif include_blank_option.is_a?(::String)
          include_blank_option
        end
      end

      def selectize_placeholder
        selectize_include_blank
      end

      def selectize_required_options
        if include_blank_option === false
          {"selectize-required": true}
        else
          {}
        end
      end

      private

      def candidate_resources
        scope =
          if options[:scope]
            options[:scope].arity.positive? ? options[:scope].call(self) : options[:scope].call
          else
            associated_class.all
          end

        order = options.delete(:order)
        order ? scope.reorder(order) : scope
      end

      def display_candidate_resource(resource)
        associated_dashboard.display_resource(resource)
      end
    end
  end
end
