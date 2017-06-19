class DefaultSearch
  def query(table_name, attr_name)
    "lower(#{table_name}.#{attr_name}) LIKE ?"
  end

  def search_term(term)
    "%#{term.downcase}%"
  end
end
