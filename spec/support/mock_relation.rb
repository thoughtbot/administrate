class MockRelation
  def initialize(data)
    @data = data
  end

  delegate :==, :count, to: :@data

  def limit(n)
    @data.first(n)
  end
end
