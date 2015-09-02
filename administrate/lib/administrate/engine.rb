require "neat"
require "normalize-rails"
require "selectize-rails"

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
