require "datetime_picker_rails"
require "jquery-rails"
require "kaminari"
require "momentjs-rails"
require "neat"
require "normalize-rails"
require "sass-rails"
require "selectize-rails"
require "sprockets/railtie"

require "administrate/page/form"
require "administrate/page/show"
require "administrate/page/collection"
require "administrate/order"
require "administrate/resource_resolver"
require "administrate/search"
require "administrate/namespace"

module Administrate
  class Engine < ::Rails::Engine
    isolate_namespace Administrate

    Engine.config.assets.precompile << /\.(?:svg)\z/
  end
end
