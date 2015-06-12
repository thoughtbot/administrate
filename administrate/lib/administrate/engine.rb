require "neat"
require "normalize-rails"

module Administrate
  class Engine < ::Rails::Engine
    isolate_namespace Administrate
  end
end
