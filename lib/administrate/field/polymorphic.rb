require_relative "associative"

module Administrate
  module Field
    class Polymorphic < BelongsTo
      def associated_resource_grouped_options
        classes.map do |klass|
          [klass.to_s, candidate_resources(klass).map do |resource|
            [display_candidate_resource(resource), resource.to_global_id]
          end]
        end
      end

      def self.permitted_attribute(attr)
        attr
      end

      def permitted_attribute
        attribute
      end

      def selected_global_id
        data.respond_to?(:to_global_id) ? data.to_global_id : nil
      end

      protected

      def associated_dashboard(klass = data.class)
        "#{klass.name}Dashboard".constantize.new
      end

      def classes
        options.fetch(:classes) || []
      end

      private

      def order
        @_order ||= options.delete(:order)
      end

      def candidate_resources(klass)
        order ? klass.order(order) : klass.all
      end

      def display_candidate_resource(resource)
        associated_dashboard(resource.class).display_resource(resource)
      end
    end
  end
end
