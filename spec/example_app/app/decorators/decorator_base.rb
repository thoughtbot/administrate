class DecoratorBase
  def initialize(model)
    @model = model
  end

  def class
    @model.class
  end

  def method_missing(method, *args, &block)
    @model.send(method, *args, &block)
  end
end
