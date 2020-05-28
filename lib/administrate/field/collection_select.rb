require_relative "base"

module Administrate
  module Field
    class CollectionSelect < Base
      def self.permitted_attribute(attribute, options = nil)
        if multiple?
          { attribute.to_sym => [] }
        else
          super
        end
      end

      def self.advanced_form?
        options.fetch(:advanced_form, true)
      end

      def method
        @method ||= options.fetch(:method, attribute).to_sym
      end

      def collection
        @collection ||= options.fetch(:collection, proc { [] })
      end

      def value_method
        @value_method ||= options.fetch(:value_method,
                                        proc { |obj| obj.to_s })
      end

      def text_method
        @text_method ||= options.fetch(:text_method,
                                       proc { |obj| obj.to_s.titleize })
      end

      def options
        @options ||= options.fetch(:options, {})
      end

      def html_options
        @html_options = options.fetch(:html_options, {})
      end

      def label
        @label ||= options.fetch(:label, attribute)
      end

      private

      def multiple?
        !!html_options[:multiple]
      end
    end
  end
end
