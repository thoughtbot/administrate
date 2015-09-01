module Administrate
  module ApplicationHelper
    def render_field(field, locals = {})
      locals.merge!(field: field)
      render locals: locals, partial: field.to_partial_path
    end

    def display_resource(resource)
      if resource.method(:to_s).owner == Kernel
        "#{resource.class.to_s.titleize} ##{resource.id}"
      else
        resource.to_s
      end
    end
  end
end
