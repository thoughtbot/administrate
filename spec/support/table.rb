module Features
  def click_row_for(model)
    all(index_row_css_for(model)).first.click
  end

  private

  def index_row_css_for(model)
    "tr[data-url='#{url_for(model)}'] .field-string"
  end

  def url_for(model)
    "/" + [
      Administrate::NAMESPACE,
      model.class.to_s.underscore.pluralize,
      model.to_param,
    ].join("/")
  end
end
