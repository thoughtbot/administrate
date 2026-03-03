Sentry.init do |config|
  config.breadcrumbs_logger = [:active_support_logger]
  config.dsn = ENV["SENTRY_DSN"]
  config.environment = ENV["SENTRY_ENV"]
  config.traces_sample_rate = 1.0
end
