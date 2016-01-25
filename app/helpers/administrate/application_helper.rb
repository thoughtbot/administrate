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

    SCOPES_LOCALE_SCOPE = [:administrate, :scopes].freeze
    # #translated_scope(key, resource_name): Retries the translation in the
    # root scope ('administrate.scopes') as fallback if translation for that
    # specific model doesn't exist. For example, calling *translated_scope
    # :active, :job_offer* with this yaml:
    #
    #   es:
    #     scopes:
    #       active: Activos
    #       job_offer:
    #         active: Activas
    #
    # ...will return "Activas", but calling *translated_scope :active, :job*
    # will return "Activos" since there's not specific translation for the
    # job model.
    # *NOTICE:* current code manages translation of a *scope_group* as if it
    # were another scope, and the translations of the default group name for
    # an array of scopes (*:scopes*) has been translated to do English (Filter)
    # and spanish (Filtros)... collaborations welcome!
    def translated_scope(key, resource_name)
      I18n.t key,
             scope: SCOPES_LOCALE_SCOPE + [resource_name],
             default: I18n.t(key, scope: SCOPES_LOCALE_SCOPE)
    end
  end
end
