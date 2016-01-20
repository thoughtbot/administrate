module Administrate
  module ApplicationHelper
    def render_field(field, locals = {})
      locals.merge!(field: field)
      render locals: locals, partial: field.to_partial_path
    end

    def display_resource_name(resource_name)
      resource_name.
        to_s.
        classify.
        constantize.
        model_name.
        human(
          count: 0,
          default: resource_name.to_s.pluralize.titleize,
        )
    end

    def svg_tag(asset, svg_id, options = {})
      svg_attributes = {
        "xlink:href".freeze => "#{asset_url(asset)}##{svg_id}",
        height: options[:height],
        width: options[:width],
      }.delete_if { |_key, value| value.nil? }
      xml_attributes = {
        "xmlns".freeze => "http://www.w3.org/2000/svg".freeze,
        "xmlns:xlink".freeze => "http://www.w3.org/1999/xlink".freeze,
      }

      content_tag :svg, xml_attributes do
        content_tag :use, nil, svg_attributes
      end
    end
  end
end
