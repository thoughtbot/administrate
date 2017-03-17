module HTTPMethodShim
  def get(path, params = nil, headers = nil)
    super(path, params: params, headers: headers)
  end

  def post(path, params = nil, headers = nil)
    super(path, params: params, headers: headers)
  end

  def put(path, params = nil, headers = nil)
    super(path, params: params, headers: headers)
  end

  def patch(path, params = nil, headers = nil)
    super(path, params: params, headers: headers)
  end

  def delete(path, params = nil, headers = nil)
    super(path, params: params, headers: headers)
  end
end

if Rails::VERSION::MAJOR >= 5
  RSpec.configure do |config|
    config.include HTTPMethodShim, type: :controller
  end
end
