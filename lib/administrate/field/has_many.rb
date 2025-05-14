require_relative "associative"
require "administrate/page/collection"
require "administrate/order"

module Administrate
  module Field
    class HasMany < Associative
      DEFAULT_LIMIT = 5

      def self.permitted_attribute(attr, _options = {})
        # This may seem arbitrary, and improvable by using reflection.
        # Worry not: here we do exactly what Rails does. Regardless of the name
        # of the foreign key, has_many associations use the suffix `_ids`
        # for this.
        #
        # Eg: if the associated table and primary key are `countries.code`,
        # you may expect `country_codes` as attribute here, but it will
        # be `country_ids` instead.
        #
        # See https://github.com/rails/rails/blob/b30a23f53b52e59d31358f7b80385ee5c2ba3afe/activerecord/lib/active_record/associations/builder/collection_association.rb#L48
        {"#{attr.to_s.singularize}_ids": []}
      end

      def associated_collection(order = self.order)
        Administrate::Page::Collection.new(
          associated_dashboard,
          order: order,
          collection_attributes: options[:collection_attributes]
        )
      end

      def attribute_key
        permitted_attribute.keys.first
      end

      def associated_resource_options
        candidate_resources.map do |associated_resource|
          [
            display_candidate_resource(associated_resource),
            associated_resource.send(association_primary_key)
          ]
        end
      end

      def selected_options
        return if data.empty?

        data.map { |object| object.send(association_primary_key) }
      end

      def limit
        options.fetch(:limit, DEFAULT_LIMIT)
      end

      def paginate?
        limit.respond_to?(:positive?) ? limit.positive? : limit.present?
      end

      def permitted_attribute
        self.class.permitted_attribute(
          attribute,
          resource_class: resource.class
        )
      end

      def resources(page = 1, order = self.order)
        resources = order.apply(data)
        if paginate?
          resources = resources.page(page).per(limit)
        end
        includes.any? ? resources.includes(*includes) : resources
      end

      def more_than_limit?
        paginate? && data.size > limit
      end

      def data
        @data ||= associated_class.none
      end

      def order_from_params(params)
        Administrate::Order.new(
          params.fetch(:order, sort_by),
          params.fetch(:direction, direction),
          sorting_column: sorting_column(
            associated_dashboard_attribute(params.fetch(:order, sort_by))
          )
        )
      end

      def order
        @order ||= Administrate::Order.new(
          sort_by,
          direction,
          sorting_column: sorting_column(
            associated_dashboard_attribute(sort_by)
          )
        )
      end

      private

      def includes
        associated_dashboard.collection_includes
      end

      def candidate_resources
        if options.key?(:includes)
          includes = options.fetch(:includes)
          associated_class.includes(*includes).all
        else
          associated_class.all
        end
      end

      def display_candidate_resource(resource)
        associated_dashboard.display_resource(resource)
      end

      def sorting_column(dashboard_attribute)
        return unless dashboard_attribute.try(:options)

        dashboard_attribute.options.fetch(:sorting_column, nil)
      end

      def associated_dashboard_attribute(attribute)
        associated_dashboard.attribute_types[attribute.to_sym] if attribute
      end

      def sort_by
        options[:sort_by]
      end

      def direction
        options[:direction]
      end
    end
  end
end
