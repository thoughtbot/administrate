class DefaultSearch
  def self.with_context(term)
    self.new(term: term)
  end

  def initialize(term:)
    @term = Array(term).flatten
  end

  def query(table_name, attr_name)
    query = [build_query(table_name, attr_name)] * @term.size
    query.join(" OR ")
  end

  def search_term
    @term.map { |term| build_search_value(term) }
  end

  def with_context(term)
    self.class.with_context(term)
  end

  protected
  def build_query(table_name, attr_name)
    "LOWER(#{table_name}.#{attr_name}) LIKE ?"
  end

  def build_search_value(term)
    "%#{term.mb_chars.downcase}%"
  end
end
