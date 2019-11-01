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

  def use_new_params_syntax?
    Rails::VERSION::STRING >= "5.2"
  end

  def get(method, params = {})
    if use_new_params_syntax?
      super(method, params: params)
    else
      super
    end
  end

  def post(method, params = {})
    if use_new_params_syntax?
      super(method, params: params)
    else
      super
    end
  end

  def put(method, params = {})
    if use_new_params_syntax?
      super(method, params: params)
    else
      super
    end
  end

  def delete(method, params = {})
    if use_new_params_syntax?
      super(method, params: params)
    else
      super
    end
  end
end
