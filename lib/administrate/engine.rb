require "kaminari"

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

    initializer "administrate.assets.precompile" do |app|
      app.config.assets.precompile += [
        "administrate/application.js",
        "administrate/application.css",
      ]
    end

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
  end
end
