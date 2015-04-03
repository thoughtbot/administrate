module Features
  def have_header(title)
    have_css("h1", text: title)
  end
end
