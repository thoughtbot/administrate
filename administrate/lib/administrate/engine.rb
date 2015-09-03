require "neat"
require "normalize-rails"
require "selectize-rails"
require "momentjs-rails"
require "datetime_picker_rails"

require "administrate/namespace"
require "administrate/page/form"
require "administrate/page/show"
require "administrate/page/table"
require "administrate/resource_resolver"

module Administrate
  class Engine < ::Rails::Engine
    isolate_namespace Administrate
  end
end
