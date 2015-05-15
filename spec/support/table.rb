module Features
  def index_row_css_for(model)
    "tr[data-url='#{url_for(model)}'] .action-show"
  end

  private

  def url_for(model)
    "/#{model.class.to_s.underscore.pluralize}/#{model.id}"
  end
end
