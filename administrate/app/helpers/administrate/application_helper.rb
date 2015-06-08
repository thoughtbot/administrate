module Administrate
  module ApplicationHelper
    def render_field(field, locals = {})
      render locals: locals, object: field, partial: field.to_partial_path
    end
  end
end
