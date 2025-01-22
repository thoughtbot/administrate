class RailsProcess
  def initialize(session)
    @session = session
    @process =
      Bundler.with_unbundled_env do
        SackRace::Process.new(
          "bundle exec rails server",
          {
            chdir: session.directory,
            verbose: true
          }
        )
      end
  end

  def start_and_wait_for_ready
    Bundler.with_unbundled_env do
      process.add_handler(:ready, "Use Ctrl-C to stop\n")
      process.start
      process.wait_for_handler(:ready)
    end
  end

  def stop
    process.stop
  end

  private

  attr_reader :process, :session
end
