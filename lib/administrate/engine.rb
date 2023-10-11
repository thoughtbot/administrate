require "importmap-rails"
require "kaminari"
require "sassc-rails"
require "selectize-rails"
require "sprockets/railtie"

require "administrate/namespace/resource"
require "administrate/not_authorized_error"
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

    initializer "administrate.importmap" do |app|
      app.importmap.draw root.join("config/importmap.rb")
    end

    initializer "administrate.assets.precompile" do |app|
      app.config.assets.precompile += [
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

    add_stylesheet "administrate/application"
  end
end
