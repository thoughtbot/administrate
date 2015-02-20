# https://devcenter.heroku.com/articles/rails-unicorn

worker_processes (ENV["UNICORN_WORKERS"] || 3).to_i
timeout (ENV["UNICORN_TIMEOUT"] || 15).to_i
preload_app true

before_fork do |_server, _worker|
  Signal.trap "TERM" do
    puts "Unicorn master intercepting TERM, sending myself QUIT instead"
    Process.kill "QUIT", Process.pid
  end

  if defined? ActiveRecord::Base
    ActiveRecord::Base.connection.disconnect!
  end
end

after_fork do |_server, _worker|
  Signal.trap "TERM" do
    puts "Unicorn worker intercepting TERM, waiting for master to send QUIT"
  end

  if defined? ActiveRecord::Base
    config = ActiveRecord::Base.configurations[Rails.env] ||
      Rails.application.config.database_configuration[Rails.env]
    config["reaping_frequency"] = (ENV["DB_REAPING_FREQUENCY"] || 10).to_i
    config["pool"] = (ENV["DB_POOL"] || 2).to_i
    ActiveRecord::Base.establish_connection(config)
  end
end
