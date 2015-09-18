class MockRelation
  def initialize(data)
    @data = data
  end

  delegate :==, to: :@data

  def limit(n)
    @data.first(n)
  end
end
