class MockRelation
  def initialize(data)
    @data = data
  end

  delegate :==, :empty?, :map, to: :@data

  def page(n)
    self
  end

  def per(n)
    @data.first(n)
  end

  def limit(n)
    @data.first(n)
  end

  def count(column = nil)
    return @data.count if column == :all
    @data.count(column)
  end
end
