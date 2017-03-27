module Administrate
  module ApplicationHelper
    PLURAL_MANY_COUNT = 2.1

    def render_field(field, locals = {})
      locals.merge!(field: field)
      if field.class.field_type == "has_one"
        resolver = Administrate::ResourceResolver.new(
          "admin/#{field.attribute}"
        )
        page = Administrate::Page::Form.new(
          resolver.dashboard_class.new,
          resolver.resource_class.new,
        )
        locals[:page] = page
      end
      render locals: locals, partial: field.to_partial_path
    end

    def display_resource_name(resource_name)
      resource_name.
        to_s.
        classify.
        constantize.
        model_name.
        human(
          count: PLURAL_MANY_COUNT,
          default: resource_name.to_s.pluralize.titleize,
        )
    end

    def sort_order(order)
      case order
      when "asc" then "ascending"
      when "desc" then "descending"
      else "none"
      end
    end

    def sanitized_order_params
      params.permit(:search, :id, :order, :page, :per_page, :direction, :orders)
    end

    def clear_search_params
      params.except(:search, :page).permit(:order, :direction, :per_page)
    end
  end
end
