module Features
  def click_row_for(model)
    within(row_css_for(model)) do
      all(clickable_table_elements).first.click
    end
  end

  private

  def row_css_for(model)
    "tr[data-url='#{url_for(model)}']"
  end

  def clickable_table_elements
    ".cell-data--string, .cell-data--number"
  end

  def url_for(model)
    "/" + [
      :admin,
      model.class.to_s.underscore.pluralize,
      model.to_param,
    ].join("/")
  end
end
