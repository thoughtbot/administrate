require_relative "associative"
require "administrate/page/collection"

module Administrate
  module Field
    class HasMany < Associative
      DEFAULT_LIMIT = 5

      def self.permitted_attribute(attribute)
        { "#{attribute.to_s.singularize}_ids".to_sym => [] }
      end

      def associated_collection
        Administrate::Page::Collection.new(associated_dashboard)
      end

      def attribute_key
        permitted_attribute.keys.first
      end

      def associated_resource_options
        candidate_resources.map do |resource|
          [display_candidate_resource(resource), resource.id]
        end
      end

      def collection_partial(namespace)
        partial = "collection"
        prefix = options[:class_name].try(:underscore).try(:pluralize) || name
        view_paths = ActionView::PathSet.new(["app/views/#{namespace}"])
        lookup_context = ActionView::LookupContext.new(view_paths)
        is_template = lookup_context.exists?(partial, [namespace, prefix], true)
        partial = [namespace, prefix, partial].join("/") if is_template
        partial
      end

      def selected_options
        data && data.map(&:id)
      end

      def limit
        options.fetch(:limit, DEFAULT_LIMIT)
      end

      def permitted_attribute
        self.class.permitted_attribute(attribute)
      end

      def resources
        data.limit(limit)
      end

      def more_than_limit?
        data.count > limit
      end

      private

      def candidate_resources
        associated_class.all
      end

      def display_candidate_resource(resource)
        associated_dashboard.display_resource(resource)
      end
    end
  end
end
