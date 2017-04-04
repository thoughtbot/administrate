require "bourbon"
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

    @@javascripts = []
    @@stylesheets = []

    if Sprockets::VERSION.start_with?("2")
      Dir[Engine.root.join("app/assets/images/**/*.svg")].each do |image|
        Engine.config.assets.precompile << File.expand_path(image)
      end
    else
      Engine.config.assets.precompile += %w(administrate/manifest.js)
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
