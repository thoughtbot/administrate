class MockRelation
  def initialize(data)
    @data = data
  end

  delegate :==, to: :@data

  def limit(n)
    @data.first(n)
  end

  def count(column = nil)
    return @data.count if column == :all
    @data.count(column)
  end
end
