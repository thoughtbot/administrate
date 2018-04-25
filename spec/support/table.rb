module Features
  def click_row_for(model)
    within(row_css_for(model)) do
      all(clickable_table_elements).first.click
    end
  end

  def click_show_link_for(model)
    within(row_css_for(model)) do
      all(show_link_elements).first.click
    end
  end

  private

  def row_css_for(model)
    "tr[id='#{model.model_name.param_key}_#{model.to_key.join('_')}']"
  end

  def clickable_table_elements
    ".cell-data--string, .cell-data--number"
  end

  def show_link_elements
    ".action-show"
  end
end
