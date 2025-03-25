require_relative "base"

module Administrate
  module Field
    class Select < Field::Base
      def self.searchable?
        true
      end

      def selectable_options
        values =
          if options.key?(:collection)
            options.fetch(:collection)
          elsif active_record_enum?
            active_record_enum_values
          else
            []
          end

        if values.respond_to? :call
          values = values.arity.positive? ? values.call(self) : values.call
        end

        values
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
        options.fetch(:include_blank, false)
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

      def active_record_enum?
        resource.class.defined_enums.key?(attribute.to_s)
      end

      def active_record_enum_values
        resource.class.defined_enums[attribute.to_s].map(&:first)
      end

      def html_controller
        "select"
      end
    end
  end
end
