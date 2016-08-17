require_relative "associative"

module Administrate
  module Field
    class BelongsTo < Associative
      def self.permitted_attribute(attr)
        :"#{attr}_id"
      end

      def permitted_attribute
        self.class.permitted_attribute(attribute)
      end

      def associated_resource_options
        [nil] + candidate_resources.map do |resource|
          [display_candidate_resource(resource), resource.id]
        end
      end

      def selected_option
        data && data.id
      end

      private

      def candidate_resources
        if options[:limit]
          associated_class.where(options[:limit])
        else
          associated_class.all
        end
      end

      def display_candidate_resource(resource)
        associated_dashboard.display_resource(resource)
      end
    end
  end
end
