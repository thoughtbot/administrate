module Features
  def have_flash(text)
    have_css(".flash-notice", text: text)
  end
end
