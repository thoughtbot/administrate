module ControllerHelpers
  def capture_view_locals
    allow(@controller).to receive(:render)
    yield

    locals = nil
    expect(@controller).to have_received(:render).at_least(1).times do |*args|
      args.each do |arg|
        locals ||= arg.try(:fetch, :locals, nil)
      end
    end
    locals
  end
end
