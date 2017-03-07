module Administrate
  module ApplicationHelper
    def render_field(field, locals = {})
      locals.merge!(field: field)
      render locals: locals, partial: field.to_partial_path
    end

    def class_from_resource(resource_name)
      resource_name.
        to_s.
        classify.
        constantize
    end

    def display_resource_name(resource_name)
      class_from_resource(resource_name).
        model_name.
        human(
          count: 0,
          default: resource_name.to_s.pluralize.titleize,
        )
    end

    def resource_index_route_key(resource_name)
      ActiveModel::Naming.route_key(class_from_resource(resource_name))
    end

    def svg_tag(asset, svg_id, options = {})
      svg_attributes = {
        "xlink:href".freeze => "#{asset_url(asset)}##{svg_id}",
        height: "100%",
        width: "100%",
      }
      xml_attributes = {
        "xmlns".freeze => "http://www.w3.org/2000/svg".freeze,
        "xmlns:xlink".freeze => "http://www.w3.org/1999/xlink".freeze,
        height: options[:height],
        width: options[:width],
      }.delete_if { |_key, value| value.nil? }

      content_tag :svg, xml_attributes do
        content_tag :use, nil, svg_attributes
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
