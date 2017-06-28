module HTTPMethodShim
  module Rails50
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

  module Rails51
    def get(path, params = nil)
      super(path, params: params.to_h)
    end

    def post(path, params = nil)
      super(path, params: params.to_h)
    end

    def put(path, params = nil)
      super(path, params: params.to_h)
    end

    def patch(path, params = nil)
      super(path, params: params.to_h)
    end

    def delete(path, params = nil)
      super(path, params: params.to_h)
    end
  end
end

if Gem::Dependency.new("rails", "~> 5.1.0").
    match?("rails", Rails::VERSION::STRING)
  RSpec.configure do |config|
    config.include HTTPMethodShim::Rails51, type: :controller
  end
end

if Gem::Dependency.new("rails", "~> 5.0.0").
    match?("rails", Rails::VERSION::STRING)
  RSpec.configure do |config|
    config.include HTTPMethodShim::Rails50, type: :controller
  end
end
