module Features
  def have_header(title)
    have_css("h1", text: title)
  end

  def have_label(title)
    have_css("label", text: title)
  end

  def have_table_header(title)
    have_css("th", text: title)
  end
end
