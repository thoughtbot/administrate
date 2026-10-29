module Administrate
  module ControllerI18n
    extend ActiveSupport::Concern

    private

    def translate_with_resource(key)
      t(
        "administrate.controller.#{key}",
        resource: resource_resolver.resource_title
      )
    end
  end
end
