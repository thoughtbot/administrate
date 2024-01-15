# The test environment is used exclusively to run your application's
# test suite. You never need to work with it otherwise. Remember that
# your test database is "scratch space" for the test suite and is wiped
# and recreated between test runs. Don't rely on the data there!

Rails.application.configure do
  config.cache_classes = true

  # Do not eager load code on boot. This avoids loading your whole application
  # just for the purpose of running a single test. If you are using a tool that
  # preloads Rails for running tests, you may have to set it to true.
  config.eager_load = false

  # Configure public file server for tests with Cache-Control for performance.
  if config.respond_to?(:public_file_server)
    config.public_file_server.enabled = true
    config.public_file_server.headers = {
      "Cache-Control" => "public, max-age=3600",
    }
  else
    config.serve_static_files = true
    config.static_cache_control = "public, max-age=3600"
  end

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false
  config.cache_store = :null_store

  # Raise exceptions instead of rendering exception templates.
  config.action_dispatch.show_exceptions = false

  # Disable request forgery protection in test environment.
  config.action_controller.allow_forgery_protection = false

  # Print deprecation notices to the stderr.
  config.active_support.deprecation = :stderr

  # Log disallowed deprecations.
  config.active_support.disallowed_deprecation = :log

  # Tell Active Support which deprecation messages to disallow.
  config.active_support.disallowed_deprecation_warnings = []

  # Raises error for missing translations.

  if Rails.gem_version <= Gem::Version.new("6.1")
    config.action_view.raise_on_missing_translations = true
  else
    config.i18n.raise_on_missing_translations = true
  end

  if Rails.gem_version >= Gem::Version.new("7.0")
    config.active_support.cache_format_version = 7.0
  end
end
