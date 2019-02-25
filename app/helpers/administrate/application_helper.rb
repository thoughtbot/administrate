module Administrate
  module ApplicationHelper
    PLURAL_MANY_COUNT = 2.1

    def render_field(field, locals = {})
      locals[:field] = field
      render locals: locals, partial: field.to_partial_path
    end

    def dashboard_from_resource(resource_name)
      "#{resource_name.to_s.singularize}_dashboard".classify.constantize
    end

    def display_resource_name(resource_name)
      dashboard_from_resource(resource_name).resource_name(
        count: PLURAL_MANY_COUNT,
        default: default_resource_name(resource_name),
      )
    end

    def sort_order(order)
      case order
      when "asc" then "ascending"
      when "desc" then "descending"
      else "none"
      end
    end

    def resource_index_route(resource_name)
      url_for(
        action: "index",
        controller: "/#{namespace}/#{resource_name}",
      )
    end

    def sanitized_order_params(page, current_field_name)
      collection_names = page.item_includes + [current_field_name]
      association_params = collection_names.map do |assoc_name|
        { assoc_name => %i[order direction page per_page] }
      end
      params.permit(:search, :id, :page, :per_page, association_params)
    end

    def clear_search_params
      params.except(:search, :page).permit(
        :per_page, resource_name => %i[order direction]
      )
    end

    private

    def default_resource_name(resource_name)
      resource_name.to_s.pluralize.gsub("/", "_").titleize
    end
  end
end
