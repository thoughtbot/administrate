module Features
  def index_row_css_for(model)
    "tr[data-url='/#{model.class.to_s.underscore.pluralize}/#{model.id}'] .action-show"
  end
end
