module Administrate
  module CollectionSortable
    extend ActiveSupport::Concern

    private

    def order
      @order ||= Administrate::Order.new(
        sorting_attribute,
        sorting_direction,
        sorting_column: sorting_column(
          dashboard_attribute(sorting_attribute)
        )
      )
    end

    def sorting_column(dashboard_attribute)
      return unless dashboard_attribute.try(:options)

      dashboard_attribute.options.fetch(:sorting_column) {
        dashboard_attribute.options.fetch(:order, nil)
      }
    end

    def sorting_attribute
      sorting_params.fetch(:order) { default_sorting_attribute }
    end

    def default_sorting_attribute
      nil
    end

    def sorting_direction
      sorting_params.fetch(:direction) { default_sorting_direction }
    end

    def default_sorting_direction
      nil
    end

    def sorting_params
      Hash.try_convert(request.query_parameters[resource_name]) || {}
    end
  end
end
