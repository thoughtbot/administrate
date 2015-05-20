module Features
  def index_row_css_for(model)
    "tr[data-url='/#{model.class.to_s.downcase.pluralize}/#{model.id}']"
  end
end
