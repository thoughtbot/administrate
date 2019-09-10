require File.expand_path("boot", __dir__)

require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_view/railtie"
require "sprockets/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module AdministratePrototype
  class Application < Rails::Application
    config.i18n.enforce_available_locales = true

    config.generators do |generate|
      generate.helper false
      generate.javascript_engine false
      generate.request_specs false
      generate.routing_specs false
      generate.stylesheets false
      generate.test_framework :rspec
      generate.view_specs false
    end

    config.action_controller.action_on_unpermitted_parameters = :raise

    if Rails::VERSION::MAJOR < 5
      # Do not swallow errors in after_commit/after_rollback callbacks.
      config.active_record.raise_in_transactional_callbacks = true
    end

    if Rails::VERSION::MAJOR >= 5
      config.active_record.time_zone_aware_types = %i(datetime time)
    end
  end
end
