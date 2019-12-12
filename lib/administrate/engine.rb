require "datetime_picker_rails"
require "jquery-rails"
require "kaminari"
require "momentjs-rails"
require "sassc-rails"
require "selectize-rails"
require "sprockets/railtie"

require "administrate/page/form"
require "administrate/page/show"
require "administrate/page/collection"
require "administrate/order"
require "administrate/resource_resolver"
require "administrate/search"
require "administrate/namespace"
require "administrate/namespace/resource"

module Administrate
  class Engine < ::Rails::Engine
    isolate_namespace Administrate

    @@javascripts = []
    @@stylesheets = []

    def self.add_javascript(script)
      @@javascripts << script
    end

    def self.add_stylesheet(stylesheet)
      @@stylesheets << stylesheet
    end

    def self.stylesheets
      @@stylesheets
    end

    def self.javascripts
      @@javascripts
    end

    add_javascript "administrate/application"
    add_stylesheet "administrate/application"

    initializer "webpacker.proxy" do |app|
      app.config.middleware.use(
        Rack::Static,
        urls: ["/administrate-packs"],
        root: File.expand_path(File.join(__dir__, "..", "..", "public")),
      )
    end
  end
end
